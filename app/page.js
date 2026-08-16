"use client";

import { useState, useMemo } from "react";
import kaqchikelWordFiles from "./kaqchikelWordFiles.json";

// Entries transcribed from source documents. Add new entries to this array.
const entries = [
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

const intakeFiles = [
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

function audioSrc(folderName, filename) {
  return "/audio/" + encodeURIComponent(folderName) + "/" + encodeURIComponent(filename);
}

function spanishTitle(filename) {
  const raw = filename.replace(/\.m4a$/i, "").trim();
  const parts = raw.split(",");
  if (parts.length >= 3) {
    return parts[0].trim();
  }
  return raw;
}

function normalizeLetter(word) {
  const c = word.trim().charAt(0).toLowerCase();
  return c.replace(/[^a-zñ']/i, "") || "#";
}

// Filenames for this collection follow "kaqchikel, español, english.m4a"
// (some source files only have kaqchikel + español, or kaqchikel alone).
// This parses that back apart for display without needing to rename
// the original archive files.
function parseKaqchikelWord(filename) {
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

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

// Each audio collection is its own self-contained folder + file list.
// To add a new one later: add a files array above (like intakeFiles),
// then add one entry here with its folder name, title, and description.
const audioCollections = [
  {
    key: "casa-alitas",
    title: "BORDER INTAKE QUESTIONS (AUDIO)",
    description:
      "Un conjunto de preguntas grabadas de admisión/evaluación de salud, guardadas juntas como su propia colección.",
    folderName: "Kaqchikel Casa Alitas",
    files: intakeFiles,
    searchPlaceholder: "buscar una pregunta…",
    emptyMessage: "ninguna pregunta coincide con tu búsqueda.",
  },
  {
    key: "kaqchikel-words",
    title: "KAQCHIKEL WORDS & PHRASES (AUDIO)",
    description:
      "Palabras y frases sueltas en Kaqchikel, grabadas por hablantes de la comunidad, con su traducción al español (y al inglés cuando está disponible).",
    folderName: "Kaqchikel Words",
    files: kaqchikelWordFiles,
    searchPlaceholder: "buscar una palabra o frase…",
    emptyMessage: "ninguna palabra coincide con tu búsqueda.",
    renderItem: (fn, folderName, i) => {
      const { headword, spanish, english } = parseKaqchikelWord(fn);
      return (
        <div className="entry" key={i}>
          <div className="entry-head">
            <span className="headword">{headword}</span>
          </div>
          {(spanish || english) && (
            <div className="definition">
              {spanish}
              {spanish && english ? " · " : ""}
              {english}
            </div>
          )}
          <audio
            className="entry-audio"
            controls
            src={audioSrc(folderName, fn)}
          >
            Tu navegador no admite la reproducción de audio.
          </audio>
        </div>
      );
    },
  },
];

function AudioSignalIcon() {
  return (
    <svg
      className="audio-icon"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="7" width="2" height="6" fill="currentColor" />
      <rect x="6" y="3" width="2" height="10" fill="currentColor" />
      <rect x="11" y="5" width="2" height="8" fill="currentColor" />
    </svg>
  );
}

function AudioCollection({
  title,
  description,
  folderName,
  files,
  searchPlaceholder,
  emptyMessage,
  renderItem,
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = files.filter((fn) => {
      if (!query) return true;
      return fn.toLowerCase().includes(query);
    });
    list.sort((a, b) => a.localeCompare(b, "es"));
    return list;
  }, [q, files]);

  return (
    <details className="panel">
      <summary>
        <span className="panel-title">
          <AudioSignalIcon /> {title}
        </span>
        <span className="panel-count">{files.length} files</span>
      </summary>
      <div className="panel-body">
        <p className="section-note">{description}</p>

        <div className="search-field">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="intake-list">
          {filtered.length === 0 && (
            <div className="empty-state">{emptyMessage}</div>
          )}
          {filtered.map((fn, i) =>
            renderItem ? (
              renderItem(fn, folderName, i)
            ) : (
              <div className="intake-item" key={i}>
                <div className="intake-title">{spanishTitle(fn)}</div>
                <audio
                  className="entry-audio"
                  controls
                  src={audioSrc(folderName, fn)}
                >
                  Tu navegador no admite la reproducción de audio.
                </audio>
              </div>
            )
          )}
        </div>
      </div>
    </details>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = entries.filter((e) => {
      if (!q) return true;
      return (e.headword + " " + e.definition).toLowerCase().includes(q);
    });
    list.sort((a, b) => a.headword.localeCompare(b.headword, "es"));
    return list;
  }, [query]);

  const groups = useMemo(() => {
    const g = {};
    filtered.forEach((e) => {
      const l = normalizeLetter(e.headword);
      if (!g[l]) g[l] = [];
      g[l].push(e);
    });
    return g;
  }, [filtered]);

  const activeLetters = Object.keys(groups).sort();

  return (
    <div className="wrap">
      <header>
        <div className="eyebrow">// community language archive</div>
        <h1>
          Kaqchikel–Spanish Glossary
          <span className="es">
            Glosario de palabras Kaqchikel con definición en español
          </span>
        </h1>
        <p className="desc">
          A public, growing record of Kaqchikel words and phrases with
          Spanish meanings, drawn from field recordings and notes.
        </p>
        <div className="stat-row">
          {entries.length} entr{entries.length === 1 ? "y" : "ies"}
        </div>
      </header>

      <details className="panel">
        <summary>
          <span className="panel-title">GLOSSARY</span>
          <span className="panel-count">{entries.length} words</span>
        </summary>
        <div className="panel-body">
          <div className="controls">
            <div className="search-field">
              <input
                type="text"
                placeholder="search a word or definition…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="alpha-strip">
              {ALPHABET.map((l) =>
                activeLetters.includes(l) ? (
                  <a key={l} href={`#letter-${l}`}>
                    {l.toUpperCase()}
                  </a>
                ) : (
                  <a key={l} className="disabled">
                    {l.toUpperCase()}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            {activeLetters.length === 0 && (
              <div className="empty-state">no words match your search.</div>
            )}
            {activeLetters.map((l) => (
              <div className="letter-group" id={`letter-${l}`} key={l}>
                <div className="letter-marker">
                  <div className="big">{l.toUpperCase()}</div>
                  <div className="rule"></div>
                </div>
                {groups[l].map((e, i) => (
                  <div className="entry" key={i}>
                    <div className="entry-head">
                      <span className="headword">{e.headword}</span>
                    </div>
                    <div className="definition">{e.definition}</div>
                    {e.literal && (
                      <div className="literal-note">{e.literal}</div>
                    )}
                    {e.audio && (
                      <audio className="entry-audio" controls src={`/audio/${e.audio}`}>
                        Your browser doesn't support audio playback.
                      </audio>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </details>

      <details className="panel">
        <summary>
          <span className="panel-title">EXAMPLE SENTENCES</span>
          <span className="panel-count">1 set</span>
        </summary>
        <div className="panel-body">
          <p className="section-note">
            Phrases are color-matched across Spanish, Kaqchikel, and English so
            corresponding chunks of meaning line up. Colors follow the source
            annotation.
          </p>

          <div className="sentence-card">
            <div className="sentence-line">
              <span className="lang-label">es</span>
              <span className="hl yellow">Míreme</span>{" "}
              <span className="hl green">a los ojos</span>{" "}
              <span className="hl orange">y verá</span>{" "}
              <span className="hl purple">que estoy diciendo</span>{" "}
              <span className="hl blue">la verdad.</span>
            </div>
            <div className="sentence-line">
              <span className="lang-label">kaq</span>
              <span className="hl yellow">Ta-tzu'</span>{" "}
              <span className="hl green">re nu-vech</span>{" "}
              <span className="hl orange">y xta-tz'et</span>{" "}
              <span
                className="hl indigo"
                title="Uncertain match — see note below"
              >
                chi
              </span>{" "}
              <span className="hl blue">kitzij ri</span>{" "}
              <span className="hl purple">nin-bij.</span>
            </div>
            <div className="sentence-line">
              <span className="lang-label">en</span>
              <span className="hl yellow">Look me</span>{" "}
              <span className="hl green">in the eyes</span>{" "}
              <span className="hl orange">and you will see</span>{" "}
              <span className="hl purple">that I'm telling</span>{" "}
              <span className="hl blue">the truth.</span>
            </div>
            <div className="sentence-meta">
              <div className="dict-ref">
                <span className="lang-label">headword</span> mirar —{" "}
                <em>-tzu' (vt1)</em>
              </div>
              <div className="uncertain-note">
                Note: I think "chi" actually links to "that" for "nin-bij."
              </div>
            </div>

            <div className="breakdown">
              <div className="breakdown-title">Direct translations</div>
              <div className="breakdown-row">
                <span className="swatch yellow"></span>Míreme / Ta-tzu' / Look
                me
              </div>
              <div className="breakdown-row">
                <span className="swatch green"></span>a los ojos / re nu-vech /
                in the eyes
              </div>
              <div className="breakdown-row">
                <span className="swatch orange"></span>y verá / y xta-tz'et /
                and you will see
              </div>
              <div className="breakdown-row">
                <span className="swatch purple"></span>que estoy diciendo /
                nin-bij / that I'm telling
              </div>
              <div className="breakdown-row">
                <span className="swatch blue"></span>la verdad / kitzij ri / the
                truth
              </div>
              <div className="breakdown-row">
                <span className="swatch indigo"></span>chi — unmatched (see
                note above)
              </div>
            </div>
          </div>

          <div className="citation">
            Cited from: <em>Diccionario Español–Cakchiquel–Inglés</em>. Robert
            W. Blair, John S. Robertson, Larry Richman, Greg Sansom, Julio
            Salazar, Juan Yool, Alejandro Choc. Brigham Young University,
            Provo, Utah, U.S.A. — Language and Intercultural Research Center,
            New World Languages Research Division.
          </div>
        </div>
      </details>

      {audioCollections.map((collection) => (
        <AudioCollection key={collection.key} {...collection} />
      ))}

      <footer>A living document — entries are added as more field data is transcribed.</footer>
    </div>
  );
}
