// Shared glossary data + parsing/search logic.
//
// This used to live entirely inside app/page.js. It was pulled out into its
// own module so that BOTH the site's UI (a client component) and the
// server-side "Claude is learning Kaqchikel" API routes can import the exact
// same real, growing archive data — entries, intake recordings, and word
// recordings — as a single source of truth. Add new entries the same way
// you always did (edit the `entries` array below, or the JSON files in
// app/), and every consumer — the glossary, the TRANSLATE box, and the
// learning-log guesser's grounding context — picks it up automatically.

import kaqchikelWordFiles from "../app/kaqchikelWordFiles.json";
import medicalTerminologyFiles from "../app/medicalTerminologyFiles.json";
import { ART_PIECES } from "./artData";
import { grammarNotes } from "./grammarData";
import { exampleSentences } from "./exampleSentencesData";

// Entries transcribed from source documents. Add new entries to this array.
export const entries = [
  { headword: "ruchi' jay", definition: "puerta (boca de la casa)", literal: "literally: ruchi' (boca) + jay (casa)" },
  { headword: "ruchi'", definition: "boca (entrada del cuerpo)", literal: "" },
  { headword: "Yatin watinisaj", definition: "te vas a bañar (you are going to take a bath)", literal: "" },
  { headword: "Pach'un", definition: "trenza (braid)", literal: "" },
  { headword: "Taya' pa ruwi ti chat'al", definition: "ponlo encima de la mesa (put it on the table)", literal: "" },
  { headword: "Joq'atin", definition: "nos vamos a bañar", literal: "source has an unclosed parenthesis here — verify against original" },
  { headword: "Utz nutztät", definition: "le gusta", literal: "" },
  { headword: "Chitin ko'ol", definition: "pequeño", literal: "" },
  { headword: "Tawelesaj", definition: "quítate", literal: "" },
  { headword: "Nasipaj jun bichin", definition: "regálame uno", literal: "" },
  { headword: "Xupuy", definition: "globo", literal: "" },
  { headword: "Ichanaj", definition: "pulsera", literal: "" },
  { headword: "Cha chal", definition: "collar", literal: "" },
  { headword: "Kab'", definition: "dulce", literal: "" },
  { headword: "Ka'etzan rikin ri k'oy", definition: "juega con el mono", literal: "" },
  { headword: "Xiqolaj, xaqolaj yan", definition: "ya comí / ya comiste", literal: "" },
  { headword: "Tatz'apij ri ruchi' jay", definition: "cierra la puerta", literal: "" },
  { headword: "Ta Jaqa' ri ruchi' jay", definition: "abre la puerta", literal: "" },
  { headword: "Pawiaj", definition: "sombrero", literal: "" },
  { headword: "Takusaj ri Apawi", definition: "pon el sombrero", literal: "" },
  { headword: "Taqojoma ri axul", definition: "toca la flauta", literal: "" },
  { headword: "Achike niqaxon chawe", definition: "qué te duele?", literal: "" },
  { headword: "Niqaxon ri axikin?", definition: "te duele el oído?", literal: "" },
  { headword: "Kaxajon", definition: "baila!", literal: "" },
  { headword: "Niqaxajon", definition: "bailemos", literal: "" },
  { headword: "Amanjani niqil jun jay", definition: "todavía no hemos encontrado casa", literal: "" },
  { headword: "Mani yaxutu'n", definition: "no hemos encontrado?", literal: "" },
  { headword: "Alas", definition: "muñeco", literal: "" },
  { headword: "Niqakanoj", definition: "estamos buscando", literal: "" },
  { headword: "Xiyakatuj", definition: "se despertó", literal: "" },
  { headword: "tib'a ok", definition: "poquito", literal: "" },
  { headword: "k'ari", definition: "después, luego", literal: "" },
  { headword: "ya kikot?", definition: "estás contenta?", literal: "" },
  { headword: "quch'ayan chik?", definition: "hasta luego", literal: "" },
  { headword: "majun nu'bän", definition: "por nada, de nada", literal: "" },
  { headword: "taq'aj", definition: "costa / plano", literal: "" },
  { headword: "tayape ri aq'a chwe", definition: "dame su mano", literal: "" },
  { headword: "achike nabän ri teqaq'ij", definition: "qué vas a hacer esta tarde?", literal: "" },
  { headword: "q'utun", definition: "comida", literal: "" },
  { headword: "atz'an", definition: "sal", literal: "" },

  // "The Itsy Bitsy Spider" / "La Itsy Bitsy Araña" / "Ri Itzi Bitzi Om" —
  // a trilingual children's song, transcribed line-by-line from her own
  // handwritten source pages (approved-public/canciones).
  { headword: "Ri Itzi Bitzi Om", definition: "La Itsy Bitsy Araña (The Itsy Bitsy Spider)", literal: "song title" },
  { headword: "Xjote'el pa rukem", definition: "subìo la telaraña (crawled up the water spout)", literal: "" },
  { headword: "Xpe k'a ri jo'b' i xu qirirej", definition: "llego la lluvia y se la llevo (down came the rain and washed the spider out)", literal: "" },
  { headword: "Xelpe ri q'ij i xuchaqirisaj", definition: "salio el sol y luego lo seco (out came the sun and dried up all the rain)", literal: "" },
  { headword: "Itzi bitzi om xjote' chik el jun b'ey", definition: "y la itsy bitsy araña de nuevo se subio (and the itsy bitsy spider climbed up the spout again)", literal: "" },
];

export const intakeFiles = [
  "¿De que país es usted?.m4a",
  "¿Está embarazada?.m4a",
  "¿Este año recibió la vacuna contra la influenza?.m4a",
  "¿Estuvo detenido por más de tres dias?.m4a",
  "¿Estuvo detenido por más de una semana? .m4a",
  "¿Ha comido algo en los últimos tres días?.m4a",
  "¿Ha comido hoy?.m4a",
  "¿Ha estado vomitando?.m4a",
  "¿Ha pasado más de un mes desde que salió de su comunidad de origen?.m4a",
  "¿Ha pasado más de una semana desde que salió de su comunidad de origen?.m4a",
  "¿Ha tenido piojos durante de su viaje?.m4a",
  "¿Ha tomado algo hoy?.m4a",
  "¿Habla español?, ¿Yach´ön pa kaxlan ch´ab´äl?, Do you speak Spanish?.m4a",
  "¿Le dieron algo de comer o tomar cuando estuvo detenido?.m4a",
  "¿Le pica la cabeza?.m4a",
  "¿Le pica la piel?.m4a",
  "¿Lo toma para diabetes?.m4a",
  "¿Lo toma para dolor de cabeza?.m4a",
  "¿Lo toma para la presión?.m4a",
  "¿Lo toma para problemas del estómago?.m4a",
  "¿Puede enseñarmelo, por favor.m4a",
  "¿Puede enseñarmelo, por favor?.m4a",
  "¿Puede escribir en español?, ¿Awetaman yatz'ib'än pa kaxlan ch'ab'äl?, Can you write in Spanish?.m4a",
  "¿Puede leer en español?.m4a",
  "¿Puedeo ver sus oídos?.m4a",
  "¿Puedo escuchar sus pulmones?.m4a",
  "¿Puedo tomar su temperatura?.m4a",
  "¿Puedo ver su garganta?.m4a",
  "¿Qué idiomas habla usted?.m4a",
  "¿Recibió atención medica por alguna enfermedad mientras estaba detenido?.m4a",
  "¿Su diarrea es acuosa o floja?.m4a",
  "¿Su diarrea tiene sangre?.m4a",
  "¿Tiene alergia a algún medicamento?.m4a",
  "¿Tiene algun problema de salud serio o que necesita ser tratado inmediatemente.m4a",
  "¿Tiene alguna enfermedad crónica?.m4a",
  "¿Tiene alguna herida o lesión?.m4a",
  "¿Tiene diarrea más de tres veces al día?.m4a",
  "¿Tiene diarrea?.m4a",
  "¿Tiene dolor abdominal?.m4a",
  "¿Tiene dolor de cabeza?.m4a",
  "¿Tiene el medicamento con usted.m4a",
  "¿Tiene el medicamento con usted?.m4a",
  "¿Tiene fiebre o escalofríos?.m4a",
  "¿Tiene mocos:líquidos?.m4a",
  "¿Tiene náuseas?.m4a",
  "¿Tiene sarpullido o cambios en la piel de sus pies?.m4a",
  "¿Tiene sarpullido o cambios en la piel?.m4a",
  "¿Tiene tos con flema?.m4a",
  "¿Tiene tos?.m4a",
  "¿Toma algún medicamento?.m4a",
  "¿Tomó algún medicamento cuando estaba detenido?.m4a",
  "¿podría ir conmigo?.m4a",
  "Ahora se siente mejor?.m4a",
  "Bienvenidos a los Estados Unidos.m4a",
  "Cuando estuvo detenido.m4a",
  "Le gustaría vacunarse?.m4a",
  "Le podemos dar la vacuna contra la influenza hoy.m4a",
  "Quisiera examinarle.m4a",
  "Tuvo diarrea?.m4a",
  "Tuvo dolor de cabeza?.m4a",
  "Tuvo dolor de garganta?.m4a",
  "Tuvo dolor de oído?.m4a",
  "Tuvo fiebre?.m4a",
  "Tuvo náuseas?.m4a",
  "Tuvo tos?.m4a",
  "Vomitó?.m4a",
  "estamos felices de tenerle aqui.m4a",
  "y la recomendamos.m4a",
];

export { kaqchikelWordFiles };

// Filenames for this collection follow "kaqchikel, español, english.m4a"
// (some source files only have kaqchikel + español, or kaqchikel alone).
// This parses that back apart for display without needing to rename
// the original archive files.
export function parseKaqchikelWord(filename) {
  const raw = filename.replace(/\.m4a$/i, "").trim();
  let parts = raw
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 1) {
    // a few source files use "!"/"?" instead of commas between languages
    const fallback = raw
      .split(/(?<=[!?])\s+(?=[A-ZÁÉÍÑÓÚÜ¿¡])/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (fallback.length > 1) parts = fallback;
  }

  const headword = parts[0] || raw;
  let spanish = "";
  let english = "";
  if (parts.length === 2) {
    spanish = parts[1];
  } else if (parts.length >= 3) {
    spanish = parts.slice(1, parts.length - 1).join(", ");
    english = parts[parts.length - 1];
  }
  english = english.replace(/\.?m4a$/i, "").trim();
  return { headword, spanish, english };
}

// Best-effort pronunciation cues, generated from Kaqchikel's standard (ALMG)
// spelling rules alone -- no audio, no model, just the letters already in a
// headword. This is Claude's understanding of general Kaqchikel orthography,
// NOT verified against a fluent speaker yet, so treat every cue here as a
// draft pending review (flag anything wrong via LANGUAGE AMENDMENTS) the
// same way every other grammar note on this site works. Deliberately does
// NOT guess syllable stress -- getting that wrong per-word would be more
// misleading than just leaving it out.
export const PRONUNCIATION_CUES = {
  "b'": "implosive b (throat tightens, a “swallowed” b)",
  "ch'": "ejective ch (a sharp, popped ch)",
  ch: "like English “ch” in chair",
  j: "like a hard h (similar to Spanish jota)",
  "k'": "ejective k (a sharp, popped k)",
  k: "like English “k” in skip (no puff of air)",
  "q'": "ejective q (a sharp, popped sound, made in the throat)",
  q: "like k, but made further back in the throat",
  "t'": "ejective t (a sharp, popped t)",
  "tz'": "ejective tz (a sharp, popped ts)",
  tz: "like “ts” in cats",
  x: "like “sh” in shoe",
  ä: "a distinct vowel, close to “u” in cup",
  "'": "glottal stop (the catch in “uh-oh”)",
};

// Longest match first, so digraphs (tz', ch', b', etc.) are found before
// their single-letter components.
const PRONUNCIATION_TOKENS = Object.keys(PRONUNCIATION_CUES).sort(
  (a, b) => b.length - a.length
);

// Returns the ordered, de-duplicated list of pronunciation cues that apply
// to a given Kaqchikel word/phrase -- e.g. "b'aq" -> ["b' = implosive b...",
// "q = like k, but made further back..."]. Plain letters with no special
// cue (a, e, i, o, u, l, m, n, p, r, s, t, w, y) are skipped entirely, since
// they're already close enough to Spanish/English not to need a note.
export function pronunciationNotes(word) {
  const w = String(word || "").toLowerCase();
  const notes = [];
  const seen = new Set();
  let i = 0;
  while (i < w.length) {
    let matched = null;
    for (const t of PRONUNCIATION_TOKENS) {
      if (w.slice(i, i + t.length) === t) {
        matched = t;
        break;
      }
    }
    const token = matched || w[i];
    if (matched && !seen.has(matched)) {
      notes.push(`${matched} = ${PRONUNCIATION_CUES[matched]}`);
      seen.add(matched);
    }
    i += token.length;
  }
  return notes;
}

function stripDiacritics(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Loose normalization for MATCHING ONLY — never used for display. Kaqchikel
// spelling leans on marks that are easy to skip on a normal keyboard: the
// diaeresis (ä, ë, ï, ö, ü — a distinct vowel, not just stress) and the
// apostrophe (marks a glottal stop — k'a and ka are different words). Those
// marks stay meaningful in every result actually shown to someone, but for
// deciding whether something counts as a hit, this search is deliberately
// forgiving: someone typing "ka" should still find "k'a". Worst case, a
// forgiving match surfaces a couple of extra near-hits; a strict one just
// finds nothing when someone leaves out a mark they didn't know was there.
export function normalizeForMatch(s) {
  return stripDiacritics(String(s || "").toLowerCase())
    .replace(/[¿?¡!.,;:"“”'’‘`´]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

// A glossary definition sometimes carries an inline English gloss in
// parentheses, e.g. "te vas a bañar (you are going to take a bath)".
export function splitDefinition(definition) {
  const m = /\(([^)]+)\)\s*$/.exec(definition || "");
  if (!m) return { spanish: definition || "", english: "" };
  return {
    spanish: definition.slice(0, m.index).trim(),
    english: m[1].trim(),
  };
}

// Every place on this site where a Kaqchikel word/phrase/sentence has a
// known Spanish and/or English translation already gets folded into one
// searchable index. This is a lookup over real recorded/transcribed data —
// not a trained model — so "TRANSLATE" only ever returns things that have
// actually been collected. It is also the grounding context the Learning
// Log's guesser reads from, so as this archive grows, what Claude is
// allowed to pattern-match against grows with it automatically.
export const TRANSLATION_INDEX = (() => {
  const idx = [];

  entries.forEach((e) => {
    const { spanish, english } = splitDefinition(e.definition);
    idx.push({ kaqchikel: e.headword, spanish, english, source: "glossary" });
  });

  kaqchikelWordFiles.forEach((fn) => {
    const { headword, spanish, english } = parseKaqchikelWord(fn);
    idx.push({
      kaqchikel: headword,
      spanish,
      english,
      source: "words",
      audio: { folderName: "Kaqchikel Words", filename: fn },
    });
  });

  // Same treatment for the Medical Terminology collection -- as soon as a
  // clip is renamed to "kaqchikel, español, english.m4a", it shows up in
  // TRANSLATE (and gets its own inline play control there) exactly like a
  // Kaqchikel Words recording does. A clip still on its raw recorder
  // timestamp just contributes that timestamp as its "kaqchikel" field
  // until it's renamed -- harmless, and it self-corrects the moment the
  // file is labeled.
  medicalTerminologyFiles.forEach((fn) => {
    const { headword, spanish, english } = parseKaqchikelWord(fn);
    idx.push({
      kaqchikel: headword,
      spanish,
      english,
      source: "medical",
      audio: { folderName: "Medical Terminology", filename: fn },
    });
  });

  // A handful of intake recordings were also filed as
  // "Español, Kaqchikel, English.m4a" — those double as translation pairs.
  intakeFiles.forEach((fn) => {
    const parts = fn
      .replace(/\.m4a$/i, "")
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length >= 3) {
      idx.push({
        kaqchikel: parts[1],
        spanish: parts[0],
        english: parts[2],
        source: "intake",
        audio: { folderName: "Kaqchikel Casa Alitas", filename: fn },
      });
    }
  });

  // ART word banks -- individual Kaqchikel words glossed on their own,
  // never the underlying lyric/quote line itself (see lib/artData.js).
  ART_PIECES.forEach((piece) => {
    piece.wordBank.forEach((w) => {
      idx.push({
        kaqchikel: w.kaq,
        spanish: null,
        english: w.en,
        source: "art",
      });
    });
  });

  // GRAMMAR notes -- the phrase/gloss itself, each parseable morpheme line
  // ("word — meaning", split on the first em dash), and, for any note with
  // a real example sentence (see lib/grammarData.js), each color-matched
  // kaq/en chunk pair.
  grammarNotes.forEach((note) => {
    if (note.phrase) {
      idx.push({
        kaqchikel: note.phrase,
        spanish: null,
        english: note.gloss || null,
        source: "grammar",
      });
    }
    (note.morphemes || []).forEach((m) => {
      const parts = m.split(" — ");
      if (parts.length >= 2 && parts[0].trim()) {
        idx.push({
          kaqchikel: parts[0].trim(),
          spanish: null,
          english: parts.slice(1).join(" — ").trim(),
          source: "grammar",
        });
      }
    });
    if (note.sentenceRows) {
      const kaqRow = note.sentenceRows.find((r) => r.lang === "kaq");
      const enRow = note.sentenceRows.find((r) => r.lang === "en");
      if (kaqRow && enRow) {
        kaqRow.chunks.forEach((chunk, i) => {
          const enChunk = enRow.chunks[i];
          if (chunk.text && enChunk?.text) {
            idx.push({
              kaqchikel: chunk.text,
              spanish: null,
              english: enChunk.text,
              source: "grammar",
            });
          }
        });
      }
    }
  });

  // EXAMPLE SENTENCES -- the curated word-by-word breakdown already gives
  // clean es/kaq/en triples per chunk (see lib/exampleSentencesData.js);
  // unmatched chunks (no clean translation yet) are skipped rather than
  // indexed with a blank field.
  exampleSentences.forEach((sentence) => {
    (sentence.breakdown || []).forEach((b) => {
      if (b.unmatched || !b.kaq) return;
      idx.push({
        kaqchikel: b.kaq,
        spanish: b.es || null,
        english: b.en || null,
        source: "example-sentences",
      });
    });
  });

  return idx
    .filter((item) => item.kaqchikel || item.spanish || item.english)
    .map((item) => ({
      ...item,
      _k: normalizeForMatch(item.kaqchikel),
      _s: normalizeForMatch(item.spanish),
      _e: normalizeForMatch(item.english),
    }));
})();

// Simple substring/exact matching across all three languages — no
// translation is invented, only what's already in TRANSLATION_INDEX is
// ever returned. Exact matches rank above partial ones.
//
// If nothing matches directly, falls back to the closest-spelled entry
// already on file (the same edit-distance approach as the Learning Log
// guesser below) — so a plain typo, not just a missing accent mark,
// still finds something instead of coming back empty. Those fallback
// hits are marked `_fuzzy: true` so the UI can label them as a closest
// match rather than implying they're confirmed/exact.
export function searchTranslations(rawQuery) {
  const q = normalizeForMatch(rawQuery);
  if (!q) return [];

  const scored = [];
  for (const item of TRANSLATION_INDEX) {
    let score = 0;
    [item._k, item._s, item._e].forEach((val) => {
      if (!val) return;
      if (val === q) score = Math.max(score, 3);
      else if (val.includes(q) || q.includes(val)) score = Math.max(score, 2);
    });
    if (score > 0) scored.push({ item, score, fuzzy: false });
  }

  if (scored.length === 0) {
    const threshold = Math.max(2, Math.floor(q.length * 0.4));
    for (const item of TRANSLATION_INDEX) {
      let dist = Infinity;
      [item._k, item._s, item._e].forEach((val) => {
        if (!val) return;
        // Compare against each WORD in the field, not the whole field --
        // comparing a single mistyped word against an entire multi-word
        // phrase makes the edit distance balloon on length alone (e.g.
        // "cheq" vs "chi rukojol" is "close" only because both are short,
        // never because they're actually similar). Splitting means a typo
        // in one word of a phrase still finds that phrase.
        val.split(" ").forEach((word) => {
          if (word.length < 2) return;
          dist = Math.min(dist, levenshtein(q, word));
        });
      });
      if (dist <= threshold) {
        // Keep fuzzy scores below the 1-3 range real matches use, closer
        // spellings ranked above farther ones.
        scored.push({ item, score: 1 - dist / (threshold + 1), fuzzy: true });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const seen = new Set();
  const results = [];
  for (const s of scored) {
    const key = s.item._k + "|" + s.item._s + "|" + s.item._e;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(s.fuzzy ? { ...s.item, _fuzzy: true } : s.item);
    if (results.length >= 8) break;
  }
  return results;
}

// Plain edit-distance between two strings — used only to find the
// closest-spelled word already in the archive. No API calls, no model,
// no cost: just arithmetic over TRANSLATION_INDEX, so it's free to run
// as often as anyone wants, and it automatically gets better as more
// real entries are added.
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// The Learning Log's guesser. This is intentionally NOT a live model
// call — it's a free, rule-based lookup against the site's own recorded
// data (the same TRANSLATION_INDEX the TRANSLATE box searches), so it
// costs nothing to run no matter how many guesses come in. It still
// "learns" in the sense that matters here: the more real entries get
// added to the archive, the more it has to match against.
//
// Step 1: if the input (near-)exactly matches something already
// recorded, just surface that — honestly labeled as already-known
// rather than a real guess.
// Step 2: otherwise, look for the closest-spelled Kaqchikel word (or,
// failing that, the closest Spanish/English word) already on file, and
// offer its translation as a cautious, low-confidence guess.
// Step 3: if nothing is close enough, say so instead of inventing
// something confident-sounding.
export function guessTranslation(rawInput) {
  const q = normalizeForMatch(rawInput);
  if (!q) {
    return {
      guessedKaqchikel: null,
      guessedSpanish: null,
      guessedEnglish: null,
      confidence: "none",
      note: "Type something first.",
    };
  }

  const exact = searchTranslations(rawInput);
  if (exact.length > 0) {
    const hit = exact[0];
    return {
      guessedKaqchikel: hit.kaqchikel || null,
      guessedSpanish: hit.spanish || null,
      guessedEnglish: hit.english || null,
      confidence: "high",
      note: "Already recorded in the archive — not really a guess, just a lookup.",
    };
  }

  let best = null;
  let bestDist = Infinity;
  let bestField = null;
  for (const item of TRANSLATION_INDEX) {
    for (const field of ["_k", "_s", "_e"]) {
      const val = item[field];
      if (!val || val.length < 2) continue;
      const dist = levenshtein(q, val);
      if (dist < bestDist) {
        bestDist = dist;
        best = item;
        bestField = field;
      }
    }
  }

  const threshold = Math.max(2, Math.floor(q.length * 0.4));
  if (best && bestDist <= threshold) {
    const closeness = bestDist <= 1 ? "medium" : "low";
    const matchedOn =
      bestField === "_k" ? "spelling" : bestField === "_s" ? "Spanish" : "English";
    return {
      guessedKaqchikel: best.kaqchikel || null,
      guessedSpanish: best.spanish || null,
      guessedEnglish: best.english || null,
      confidence: closeness,
      note: `Closest recorded match by ${matchedOn} — not confirmed for this exact word.`,
    };
  }

  return {
    guessedKaqchikel: null,
    guessedSpanish: null,
    guessedEnglish: null,
    confidence: "none",
    note: "Nothing close enough in the archive yet to guess from.",
  };
}
