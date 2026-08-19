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
    if (score > 0) scored.push({ item, score });
  }
  scored.sort((a, b) => b.score - a.score);

  const seen = new Set();
  const results = [];
  for (const s of scored) {
    const key = s.item._k + "|" + s.item._s + "|" + s.item._e;
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(s.item);
    if (results.length >= 8) break;
  }
  return results;
}
