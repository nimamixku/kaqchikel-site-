import { NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { isOwnerRequest, hashIp } from "../../../lib/ownerAuth";
import { guessTranslation, TRANSLATION_INDEX } from "../../../lib/glossaryData";

export const runtime = "nodejs";

const MAX_INPUT_LEN = 120;

// Real Claude guessing costs real money (your Anthropic prepaid credit
// balance), so ONLY the signed-in archive keeper can ever trigger it —
// enforced here, server-side, not just by hiding the button in the UI.
// This is a sanity ceiling on your own testing, not a defense against
// public abuse (visitors are already blocked below).
const MAX_TOTAL_PER_DAY = Number(process.env.MAX_DAILY_GUESSES || 150);

// Builds the guesser's grounding context straight from the site's own
// live data (lib/glossaryData.js), so it automatically covers more ground
// as the real archive grows — no separate list to keep in sync by hand.
function buildGroundingText() {
  const lines = TRANSLATION_INDEX.slice(0, 250).map((item) => {
    const parts = [item.kaqchikel, item.spanish, item.english].filter(Boolean);
    return parts.join(" = ");
  });
  return lines.join("\n");
}

async function askClaude(text) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured yet — fall back to the free local guesser rather
    // than breaking the box while you're still setting things up.
    return guessTranslation(text);
  }

  const model = process.env.ANTHROPIC_GUESS_MODEL || "claude-haiku-4-5-20251001";
  const grounding = buildGroundingText();

  const system = `You are a cautious language-documentation assistant helping guess Kaqchikel translations for a small public community archive. Kaqchikel is an endangered, low-resource Mayan language with real dialectal variation between towns. You are NOT an authoritative source — every answer you give is shown publicly labeled as an unverified guess, and a human reviewer decides later whether it was right.

Use ONLY the patterns visible in the real recorded vocabulary below as your grounding, the way a careful linguist would extrapolate cautiously from attested examples. If the input isn't reasonably inferable from these patterns, say so honestly (return nulls, confidence "low") instead of inventing something confident-sounding.

Real recorded data from this archive (Kaqchikel = Spanish / English):
${grounding}

Reply with strict JSON only, no prose, no markdown fences, in exactly this shape:
{"guessedKaqchikel": string|null, "guessedSpanish": string|null, "guessedEnglish": string|null, "confidence": "low"|"medium"|"high", "note": string}
Keep "note" under 200 characters — briefly explain your reasoning or flag uncertainty/dialect risk.`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 300,
      system,
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    console.error("Anthropic API error", resp.status, errText);
    return {
      guessedKaqchikel: null,
      guessedSpanish: null,
      guessedEnglish: null,
      confidence: "none",
      note: "Claude couldn't be reached just now — try again in a bit.",
    };
  }

  const data = await resp.json();
  const raw = data?.content?.[0]?.text || "{}";
  return parseGuessJson(raw);
}

// Claude is instructed to reply with strict JSON, but real-world replies
// sometimes come wrapped in a markdown code fence or have a stray sentence
// before/after the object. Rather than failing the whole guess over that,
// strip common wrapping and pull out the {...} object itself.
function parseGuessJson(raw) {
  const attempts = [raw];

  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) attempts.push(fenced[1]);

  const braceMatch = raw.match(/\{[\s\S]*\}/);
  if (braceMatch) attempts.push(braceMatch[0]);

  for (const candidate of attempts) {
    try {
      const parsed = JSON.parse(candidate.trim());
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      // try the next candidate
    }
  }

  console.error("Could not parse Claude guess JSON:", raw);
  return {
    guessedKaqchikel: null,
    guessedSpanish: null,
    guessedEnglish: null,
    confidence: "low",
    note: "Couldn't parse a clean guess that time — try rephrasing.",
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const text = (body?.input || "").toString().trim().slice(0, MAX_INPUT_LEN);
    if (!text) {
      return NextResponse.json(
        { error: "Type a word or short phrase first." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = hashIp(ip);
    const owner = isOwnerRequest(req);

    // Guessing calls a paid API, so only the signed-in archive keeper can
    // trigger it. Visitors can still see every guess and its outcome in
    // the public log below; they just can't spend your API balance.
    if (!owner) {
      return NextResponse.json(
        {
          error:
            "Guessing is limited to the archive keeper for now — sign in above if that's you. Everyone can still watch the log.",
        },
        { status: 403 }
      );
    }

    const { rows: totalRows } = await query(
      `select count(*)::int as c from guess_log where created_at > now() - interval '1 day'`
    );
    if (totalRows[0].c >= MAX_TOTAL_PER_DAY) {
      return NextResponse.json(
        {
          error:
            "Hit today's sanity cap for this experiment — check back tomorrow (or raise MAX_DAILY_GUESSES).",
        },
        { status: 429 }
      );
    }

    const guess = await askClaude(text);

    const { rows } = await query(
      `insert into guess_log
        (source_type, input_text, guessed_kaqchikel, guessed_spanish, guessed_english, confidence, ai_note, ip_hash)
       values ($1,$2,$3,$4,$5,$6,$7,$8)
       returning id, source_type, input_text, guessed_kaqchikel, guessed_spanish, guessed_english, confidence, ai_note, status, created_at`,
      [
        "owner",
        text,
        guess.guessedKaqchikel || null,
        guess.guessedSpanish || null,
        guess.guessedEnglish || null,
        guess.confidence || null,
        guess.note || null,
        ipHash,
      ]
    );

    return NextResponse.json({ entry: rows[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong on our end — " + (err.message || "") },
      { status: 500 }
    );
  }
}
