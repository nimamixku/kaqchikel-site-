import { NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { isOwnerRequest, hashIp } from "../../../lib/ownerAuth";
import { TRANSLATION_INDEX } from "../../../lib/glossaryData";

export const runtime = "nodejs";

const MAX_INPUT_LEN = 120;
const MAX_PER_IP_PER_DAY = Number(process.env.MAX_GUESSES_PER_IP_PER_DAY || 15);
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
    return {
      guessedKaqchikel: null,
      guessedSpanish: null,
      guessedEnglish: null,
      confidence: "none",
      note: "Guessing isn't switched on for this site yet (no API key configured).",
    };
  }

  const model = process.env.ANTHROPIC_GUESS_MODEL || "claude-3-5-haiku-20241022";
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
  try {
    return JSON.parse(raw);
  } catch {
    return {
      guessedKaqchikel: null,
      guessedSpanish: null,
      guessedEnglish: null,
      confidence: "low",
      note: "Couldn't parse a clean guess that time — try rephrasing.",
    };
  }
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

    // Rate limits protect against a runaway bill from public abuse — they
    // don't apply to the archive keeper's own testing.
    if (!owner) {
      const { rows: ipRows } = await query(
        `select count(*)::int as c from guess_log where ip_hash = $1 and created_at > now() - interval '1 day'`,
        [ipHash]
      );
      if (ipRows[0].c >= MAX_PER_IP_PER_DAY) {
        return NextResponse.json(
          {
            error:
              "You've hit today's guess limit for this experiment — come back tomorrow!",
          },
          { status: 429 }
        );
      }
    }

    const { rows: totalRows } = await query(
      `select count(*)::int as c from guess_log where created_at > now() - interval '1 day'`
    );
    if (totalRows[0].c >= MAX_TOTAL_PER_DAY) {
      return NextResponse.json(
        {
          error:
            "Claude's hit its daily guess budget for this experiment — check back tomorrow.",
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
        owner ? "owner" : "visitor",
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
