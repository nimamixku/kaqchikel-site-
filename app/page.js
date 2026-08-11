"use client";

import { useState, useMemo } from "react";

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

function normalizeLetter(word) {
  const c = word.trim().charAt(0).toLowerCase();
  return c.replace(/[^a-zñ']/i, "") || "#";
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

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
        <div className="eyebrow">Community language archive</div>
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
              </div>
            ))}
          </div>
        ))}
      </div>

      <section className="sentence-section">
        <h2>Example Sentences</h2>
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
      </section>

      <footer>A living document — entries are added as more field data is transcribed.</footer>
    </div>
  );
}
