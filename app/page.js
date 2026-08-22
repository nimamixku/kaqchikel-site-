"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import kaqchikelWordFiles from "./kaqchikelWordFiles.json";
import {
  entries,
  intakeFiles,
  parseKaqchikelWord,
  searchTranslations,
} from "../lib/glossaryData";

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

function TranslateBox() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchTranslations(q), [q]);
  const hasQuery = q.trim().length > 0;

  return (
    <div className="panel translate-box">
      <div className="translate-box-title">
        <span className="panel-title">
          <AudioSignalIcon /> TRANSLATE
        </span>
        <span className="panel-count">beta</span>
      </div>
      <div className="panel-body translate-box-body">
        <p className="section-note">
          Looks up your word or sentence against everything already recorded
          and transcribed on this site. It's a search over real data, not a
          trained model yet — so it only finds what's actually been
          collected so far, and tells you honestly when something isn't
          there.
        </p>
        <div className="search-field">
          <input
            type="text"
            placeholder="escribe una palabra o frase en Kaqchikel o Español…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        {hasQuery && results.length === 0 && (
          <div className="empty-state">
            no match in our recorded data yet — try a shorter phrase or a
            single word, or browse the sections below.
          </div>
        )}
        {results.length > 0 && (
          <div className="translate-results">
            {results.map((r, i) => (
              <div className="entry" key={i}>
                {r.kaqchikel && (
                  <div className="entry-head">
                    <span className="lang-label">kaq</span>
                    <span className="headword">{r.kaqchikel}</span>
                  </div>
                )}
                {r.spanish && (
                  <div className="definition">
                    <span className="lang-label">es</span>
                    {r.spanish}
                  </div>
                )}
                {r.english && (
                  <div className="definition">
                    <span className="lang-label">en</span>
                    {r.english}
                  </div>
                )}
                {r.audio && (
                  <audio
                    className="entry-audio"
                    controls
                    src={audioSrc(r.audio.folderName, r.audio.filename)}
                  >
                    Tu navegador no admite la reproducción de audio.
                  </audio>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function artSrc(filename) {
  return "/art/" + encodeURIComponent(filename);
}

// Each art piece pairs a photograph with a Kaqchikel translation the user
// wrote over/alongside someone else's song lyrics or a literary quote. The
// lyric/quote text itself is never reproduced here as separate text (it's
// copyrighted, and a translation of it is still a derivative of it) — the
// full piece, in both languages, lives in the image. What IS reproduced is
// a small "word bank": a handful of individual Kaqchikel words pulled out
// and glossed on their own (not in the original line order), the same way
// any of the standalone glossary entries elsewhere on this site work.
// These glosses are Claude's best-guess reading from context, not a
// verified dictionary source — treat them as a draft pending review.
const ART_PIECES = [
  {
    key: "surrender-1",
    title: "Untitled",
    credit: "Maggie Rogers, “Surrender”",
    file: "surrender-1.jpg",
    wordBank: [
      { kaq: "b'enäq", en: "in love", morph: "root only — no prefix" },
      { kaq: "nuk'u'x", en: "my heart", morph: "nu- (my) + k'u'x (heart)" },
      { kaq: "nuq'a'", en: "my hand", morph: "nu- (my) + q'a' (hand)" },
      { kaq: "rub'aqil", en: "the bone", morph: "ru- (usually 3rd person possessive 'its', but functioning here as 'the') + b'aqil (bone — b'aq is the root; -il may mark plural here, needs grammatical clarification)" },
      { kaq: "woyowal", en: "my anger", morph: "w- (my, before a vowel) + oyowal (anger)" },
      { kaq: "ya'", en: "water", morph: "root only — no prefix" },
    ],
  },
  {
    key: "surrender-2",
    title: "Untitled",
    credit: "Maggie Rogers, “Surrender”",
    file: "surrender-2.jpg",
    wordBank: [
      { kaq: "k'u'x", en: "heart", morph: "root only — no prefix" },
      { kaq: "q'ojom", en: "music / instrument", morph: "root only — no prefix" },
      { kaq: "saqi'l", en: "light / brightness", morph: "saq (light) + -i'l (noun suffix)" },
    ],
  },
  {
    key: "above-and-beyond",
    title: "Untitled",
    credit: "Jhené Aiko, “Above and Beyond”",
    file: "above-and-beyond.jpg",
    wordBank: [
      { kaq: "napaxij", en: "you break (it)", morph: "na- (incompletive) + paxij (root: to break)" },
      { kaq: "qitzij", en: "truth", morph: "root only — no prefix" },
      { kaq: "tob'ej", en: "to fight for / help", morph: "root only — no prefix" },
      { kaq: "wanima'", en: "your heart", morph: "aw- (your, before a vowel) + anima' (heart)" },
      { kaq: "wetaman", en: "I know", morph: "w- (I, before a vowel) + etaman (root: to know)" },
    ],
  },
  {
    key: "risk-fkj-bas",
    title: "Untitled",
    credit: "FKJ, Bas & Rikkat, “Risk”",
    file: "risk-fkj-bas.jpg",
    wordBank: [
      { kaq: "ajaw", en: "god / lord", morph: "root only — no prefix" },
      { kaq: "b'ix", en: "song", morph: "root only — no prefix" },
      { kaq: "ch'umil", en: "star", morph: "root only — no prefix" },
      { kaq: "juyu'", en: "mountain / land", morph: "root only — no prefix" },
      { kaq: "winaqi'", en: "people", morph: "winaq (person) + -i' (plural)" },
    ],
  },
  {
    key: "johnny-ps-caddy",
    title: "Untitled",
    credit: "Benny the Butcher & J. Cole, “Johnny P's Caddy”",
    file: "johnny-ps-caddy.jpg",
    wordBank: [
      { kaq: "ala'", en: "boy", morph: "root only — no prefix" },
      { kaq: "aq'a'", en: "night", morph: "root only — no prefix" },
      { kaq: "koj", en: "lion", morph: "root only — no prefix" },
      { kaq: "qitzij", en: "truth", morph: "root only — no prefix" },
      { kaq: "saqil", en: "light", morph: "saq (light) + -il (noun suffix)" },
    ],
  },
  {
    key: "all-eyes-on-me",
    title: "Untitled",
    credit: "EarthGang, “All Eyes on Me”",
    file: "all-eyes-on-me.jpg",
    wordBank: [
      { kaq: "nib'ixan", en: "she sings", morph: "ni- (incompletive) + b'ixan (root: to sing)" },
      { kaq: "nub'ix", en: "my song", morph: "nu- (my) + b'ix (song)" },
      { kaq: "nujolom", en: "my head / mind", morph: "nu- (my) + jolom (head)" },
      { kaq: "retaman", en: "she knows", morph: "r- (she/he, before a vowel) + etaman (root: to know)" },
    ],
  },
  {
    key: "ondaatje",
    title: "Untitled",
    credit: "Michael Ondaatje (quote)",
    file: "ondaatje.jpg",
    wordBank: [
      { kaq: "näj", en: "far / a long time", morph: "root only — no prefix" },
      { kaq: "nq'axon", en: "it hurts / aches", morph: "n- (incompletive) + q'axon (root: to hurt, to pass through)" },
      { kaq: "nuk'u'x", en: "my heart", morph: "nu- (my) + k'u'x (heart)" },
      { kaq: "wawe'", en: "here", morph: "root only — no prefix" },
    ],
  },
  {
    key: "gabriel-hirsch",
    title: "Untitled",
    credit: "Edward Hirsch, “Gabriel” (quote)",
    file: "gabriel-hirsch.jpg",
    wordBank: [
      { kaq: "chwa'q", en: "morning", morph: "root only — no prefix" },
      { kaq: "juna'", en: "year", morph: "root only — no prefix" },
    ],
  },
  {
    key: "light-on",
    title: "Untitled",
    credit: "Maggie Rogers, “Light On”",
    file: "light-on.jpg",
    wordBank: [
      { kaq: "jumul", en: "once / together", morph: "root only — no prefix" },
      { kaq: "nuk'u'x", en: "my heart", morph: "nu- (my) + k'u'x (heart)" },
      { kaq: "saqil", en: "light", morph: "saq (light) + -il (noun suffix)" },
    ],
  },
  {
    key: "stay-mac-miller",
    title: "Untitled",
    credit: "Mac Miller, “Stay” / Xavier Rudd, “Ocean Floor”",
    file: "stay-mac-miller.jpg",
    wordBank: [
      { kaq: "nab'ij", en: "you say", morph: "na- (incompletive) + b'ij (root: to say)" },
      { kaq: "palow", en: "ocean / sea", morph: "root only — no prefix" },
      { kaq: "wetaman", en: "I know", morph: "w- (I, before a vowel) + etaman (root: to know)" },
      { kaq: "yab'e", en: "you go / leave", morph: "ya- (you, incompletive) + b'e (root: to go)" },
    ],
  },
];

// Matches a word-bank word against the shared LANGUAGE AMENDMENTS log, so a
// flagged note shows up right where the word actually lives, not just in
// the central log.
function findAmendment(amendments, kaqWord) {
  const target = kaqWord.trim().toLowerCase();
  return amendments.find((a) => a.item.trim().toLowerCase() === target);
}

function ArtPiece({ piece, amendments }) {
  return (
    <details className="panel art-piece">
      <summary>
        <span className="panel-title">{piece.credit}</span>
      </summary>
      <div className="panel-body">
        <img className="art-image" src={artSrc(piece.file)} alt={piece.credit} />
        <div className="citation">Lyrics/quote and photograph: see full piece above. Kaqchikel translation and photography by Abra Kinkopf.</div>
        <div className="breakdown">
          <div className="breakdown-title">Word bank</div>
          <div className="word-bank">
            {piece.wordBank.map((w, i) => {
              const flagged = findAmendment(amendments, w.kaq);
              return (
                <div className="word-bank-item" key={i}>
                  <span className="word-bank-kaq">{w.kaq}</span>
                  <span className="word-bank-en">{w.en}</span>
                  {w.morph && <span className="word-bank-morph">{w.morph}</span>}
                  {flagged && (
                    <span className="word-bank-flag">
                      ⚑ {flagged.note}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </details>
  );
}

// A running log of grammar points flagged as uncertain across the site —
// word banks, example sentences, anywhere a gloss or morphology note is a
// best guess rather than confirmed. Backed by the `clarifications` table so
// the archive keeper can add, edit, and resolve entries by signing in —
// the same passcode/cookie system as the guess log above — with the change
// showing up here immediately for everyone, since this panel is the only
// place these notes live.
function AmendmentItem({
  entry: c,
  isOwner,
  isEditing,
  editSource,
  editItem,
  editQuestion,
  editNote,
  editBusy,
  onStartEdit,
  onCancelEdit,
  onChangeEdit,
  onSaveEdit,
  onToggleResolved,
  onDelete,
}) {
  return (
    <details className="panel amendment-item">
      <summary>
        <span className="panel-title">
          <span className={"plan-marker" + (c.resolved ? " done" : "")}></span>
          {c.question}
          {c.resolved ? " (resolved)" : ""}
        </span>
        <span className="panel-count amendment-meta">{c.item}</span>
      </summary>
      <div className="panel-body">
        {isEditing ? (
          <span className="clarification-form">
            <input
              value={editSource}
              onChange={(e) => onChangeEdit("source", e.target.value)}
              placeholder="source (e.g. ART — word bank)"
            />
            <input
              value={editItem}
              onChange={(e) => onChangeEdit("item", e.target.value)}
              placeholder="exact word as it appears in a word bank"
            />
            <input
              value={editQuestion}
              onChange={(e) => onChangeEdit("question", e.target.value)}
              placeholder="short lead-in, e.g. b'aq vs b'aqil — when to use"
            />
            <textarea
              value={editNote}
              onChange={(e) => onChangeEdit("note", e.target.value)}
              placeholder="the fuller note"
              rows={3}
            />
            <span className="clarification-actions">
              <button
                type="button"
                className="link-btn"
                disabled={editBusy}
                onClick={onSaveEdit}
              >
                save
              </button>
              <button type="button" className="link-btn" onClick={onCancelEdit}>
                cancel
              </button>
            </span>
          </span>
        ) : (
          <>
            <p className="section-note" style={{ marginTop: 0 }}>
              {c.source} — {c.item}
            </p>
            <p className="section-note">{c.note}</p>
            {isOwner && (
              <span className="clarification-actions">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => onToggleResolved(c)}
                >
                  {c.resolved ? "reopen" : "mark resolved"}
                </button>
                <button type="button" className="link-btn" onClick={() => onStartEdit(c)}>
                  edit
                </button>
                <button type="button" className="link-btn" onClick={() => onDelete(c.id)}>
                  remove
                </button>
              </span>
            )}
          </>
        )}
      </div>
    </details>
  );
}

function ClarificationSection() {
  const [entries, setEntries] = useState([]);
  const [ready, setReady] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showKeeperForm, setShowKeeperForm] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [keeperError, setKeeperError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editSource, setEditSource] = useState("");
  const [editItem, setEditItem] = useState("");
  const [editQuestion, setEditQuestion] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editBusy, setEditBusy] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSource, setNewSource] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newNote, setNewNote] = useState("");
  const [addBusy, setAddBusy] = useState(false);
  const [addError, setAddError] = useState("");

  async function loadEntries() {
    try {
      const res = await fetch("/api/clarifications");
      const data = await res.json();
      setEntries(data.entries || []);
      setReady(!!data.ready);
    } catch {
      // quietly ignore — the panel just stays hidden until the API is reachable
      setReady(false);
    }
  }

  useEffect(() => {
    loadEntries();
    fetch("/api/owner")
      .then((r) => r.json())
      .then((d) => setIsOwner(!!d.isOwner))
      .catch(() => {});
    const t = setInterval(loadEntries, 20000);
    return () => clearInterval(t);
  }, []);

  async function signInAsKeeper(e) {
    e.preventDefault();
    setKeeperError("");
    try {
      const res = await fetch("/api/owner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setKeeperError("that passcode isn't right.");
        return;
      }
      setIsOwner(true);
      setShowKeeperForm(false);
      setPasscode("");
    } catch {
      setKeeperError("couldn't sign in just now.");
    }
  }

  async function signOutKeeper() {
    try {
      await fetch("/api/owner", { method: "DELETE" });
    } catch {}
    setIsOwner(false);
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setEditSource(entry.source);
    setEditItem(entry.item);
    setEditQuestion(entry.question);
    setEditNote(entry.note);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function changeEdit(field, value) {
    if (field === "source") setEditSource(value);
    if (field === "item") setEditItem(value);
    if (field === "question") setEditQuestion(value);
    if (field === "note") setEditNote(value);
  }

  async function saveEdit() {
    setEditBusy(true);
    try {
      const res = await fetch(`/api/clarifications/${editingId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: editSource,
          item: editItem,
          question: editQuestion,
          note: editNote,
        }),
      });
      if (res.ok) {
        setEditingId(null);
        await loadEntries();
      }
    } catch {} finally {
      setEditBusy(false);
    }
  }

  async function toggleResolved(entry) {
    try {
      const res = await fetch(`/api/clarifications/${entry.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resolved: !entry.resolved }),
      });
      if (res.ok) await loadEntries();
    } catch {}
  }

  async function deleteEntry(id) {
    try {
      const res = await fetch(`/api/clarifications/${id}`, { method: "DELETE" });
      if (res.ok) await loadEntries();
    } catch {}
  }

  async function submitNew(e) {
    e.preventDefault();
    if (
      !newSource.trim() ||
      !newItem.trim() ||
      !newQuestion.trim() ||
      !newNote.trim() ||
      addBusy
    )
      return;
    setAddBusy(true);
    setAddError("");
    try {
      const res = await fetch("/api/clarifications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: newSource,
          item: newItem,
          question: newQuestion,
          note: newNote,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || "Something went wrong.");
      } else {
        setNewSource("");
        setNewItem("");
        setNewQuestion("");
        setNewNote("");
        setShowAddForm(false);
        await loadEntries();
      }
    } catch {
      setAddError("Couldn't reach the site just now.");
    } finally {
      setAddBusy(false);
    }
  }

  const openCount = entries.filter((e) => !e.resolved).length;

  // Stay invisible until the clarifications table actually exists — no
  // point showing an empty-looking panel before the one-time database
  // migration has been run.
  if (!ready) return null;

  return (
    <details className="panel plan-panel">
      <summary>
        <div className="plan-summary-top">
          <span className="panel-title">
            <span className="plan-toggle-icon plan-toggle-closed">[+]</span>
            <span className="plan-toggle-icon plan-toggle-open">[-]</span>{" "}
            LANGUAGE AMENDMENTS
          </span>
          <span className="panel-count">{openCount} open</span>
        </div>
      </summary>
      <div className="panel-body">
        <p className="section-note">
          Grammar and gloss points flagged as uncertain across the site,
          kept in one place so they don&rsquo;t get lost — click a question
          to expand it. A flagged word also shows the same note right where
          it lives — for example next to a word in the ART word banks (⚑) —
          so it&rsquo;s not just buried here. The archive keeper can sign in
          below to add, fix, or resolve a note — since this log is the
          single source both places read from, a fix shows up everywhere
          it&rsquo;s flagged right away for everyone, including other
          visitors already on the page within about 20 seconds.
        </p>

        <div className="keeper-row">
          {isOwner ? (
            <span className="source-badge owner">
              🔑 signed in as archive keeper —{" "}
              <button type="button" className="link-btn" onClick={signOutKeeper}>
                sign out
              </button>
            </span>
          ) : showKeeperForm ? (
            <form className="owner-gate" onSubmit={signInAsKeeper}>
              <input
                type="password"
                placeholder="archive keeper passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button type="submit" className="link-btn">
                enter
              </button>
              {keeperError && <span className="keeper-error">{keeperError}</span>}
            </form>
          ) : (
            <button
              type="button"
              className="link-btn"
              onClick={() => setShowKeeperForm(true)}
            >
              sign in as archive keeper
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">no open questions right now.</div>
        ) : (
          <div className="amendment-list">
            {entries.map((c) => (
              <AmendmentItem
                key={c.id}
                entry={c}
                isOwner={isOwner}
                isEditing={editingId === c.id}
                editSource={editSource}
                editItem={editItem}
                editQuestion={editQuestion}
                editNote={editNote}
                editBusy={editBusy}
                onStartEdit={startEdit}
                onCancelEdit={cancelEdit}
                onChangeEdit={changeEdit}
                onSaveEdit={saveEdit}
                onToggleResolved={toggleResolved}
                onDelete={deleteEntry}
              />
            ))}
          </div>
        )}

        {isOwner && (
          <div className="clarification-add">
            {showAddForm ? (
              <form className="clarification-form" onSubmit={submitNew}>
                <input
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="source (e.g. ART — word bank)"
                  maxLength={120}
                />
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="exact word as it appears in a word bank"
                  maxLength={120}
                />
                <input
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="short lead-in, e.g. b'aq vs b'aqil — when to use"
                  maxLength={160}
                />
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="the fuller note"
                  rows={3}
                  maxLength={600}
                />
                <span className="clarification-actions">
                  <button type="submit" className="link-btn" disabled={addBusy}>
                    {addBusy ? "flagging…" : "flag it"}
                  </button>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    cancel
                  </button>
                </span>
                {addError && <div className="empty-state">{addError}</div>}
              </form>
            ) : (
              <button
                type="button"
                className="link-btn"
                onClick={() => setShowAddForm(true)}
              >
                + flag a new question
              </button>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

function ArtSection() {
  const [amendments, setAmendments] = useState([]);

  useEffect(() => {
    let cancelled = false;
    function load() {
      fetch("/api/clarifications")
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled) setAmendments(d.entries || []);
        })
        .catch(() => {});
    }
    load();
    const t = setInterval(load, 20000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return (
    <details className="panel">
      <summary>
        <span className="panel-title">ART</span>
        <span className="panel-count">{ART_PIECES.length} pieces</span>
      </summary>
      <div className="panel-body">
        <p className="section-note">
          A personal series translating song lyrics and quotes into
          Kaqchikel, layered over photography. Each piece is shown in full
          below; the lyric/quote text itself isn&rsquo;t reproduced
          separately since it belongs to its original artist — only a small
          word bank pulled from each piece is. A flagged word (⚑) has an open
          grammar question — see LANGUAGE AMENDMENTS below.
        </p>
        {ART_PIECES.map((piece) => (
          <ArtPiece key={piece.key} piece={piece} amendments={amendments} />
        ))}
      </div>
    </details>
  );
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
      "Intake questions translated and recorded for Casa Alitas, a welcome center and shelter for vulnerable migrant families and legal asylum seekers released from federal border custody, providing them with food, clothing, temporary lodging, and travel coordination.",
    folderName: "Kaqchikel Casa Alitas",
    files: intakeFiles,
    searchPlaceholder: "buscar una pregunta…",
    emptyMessage: "ninguna pregunta coincide con tu búsqueda.",
  },
  {
    key: "kaqchikel-words",
    title: "KAQCHIKEL WORDS & PHRASES (AUDIO)",
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

// Children's songs collection. To add another song later:
// 1. Drop its audio file(s) in public/audio/<song-key>/
// 2. If it has illustrated/handwritten pages, drop images in
//    public/images/<song-key>/
// 3. Add one entry below — `pages` and `handwrittenPhoto` are both
//    optional, so an audio-only song just needs `audioTracks`.
const CHILDREN_SONGS = [
  {
    key: "itsy-bitsy-spider",
    title: "The Itsy Bitsy Spider — Ri Itzi Bitzi Om",
    handwrittenPhoto: {
      src: "/images/itsy-bitsy-spider/handwritten-original.jpg",
      alt: "The original handwritten page, in Kaqchikel",
      caption: "handwritten, MJML",
    },
    pages: [
      {
        src: "/images/itsy-bitsy-spider/page-1.png",
        alt: "Title page: The Itsy Bitsy Spider / La Itsy Bitsy Araña / Ri Itzi Bitzi Om",
      },
      {
        src: "/images/itsy-bitsy-spider/page-2.png",
        alt: "crawled up the water spout / subìo la telaraña / xjote'el pa rukem",
      },
      {
        src: "/images/itsy-bitsy-spider/page-3.png",
        alt: "down came the rain and washed the spider out / llego la lluvia y se la llevo / xpe k'a ri jo'b' i xu qirirej",
      },
      {
        src: "/images/itsy-bitsy-spider/page-4.png",
        alt: "out came the sun and dried up all the rain / salio el sol y luego lo seco / xelpe ri q'ij i xuchaqirisaj",
      },
      {
        src: "/images/itsy-bitsy-spider/page-5.png",
        alt: "and the itsy bitsy spider climbed up the spout again / y la itsy bitsy araña de nuevo se subio / itzi bitzi om xjote' chik el jun b'ey",
      },
    ],
    audioTracks: [
      {
        label: "Kaqchikel — Bitzi bitzi Om",
        src: "/audio/itsy-bitsy-spider/kaqchikel.m4a",
        // Hand-timed against the actual recording: page flips at 1s, 3s,
        // 6s, and 12s (5 pages total, page 1 shown from 0s to 1s).
        pageBreaks: [1, 3, 6, 12],
      },
      {
        label: "Español — Itzi bitsy araña",
        src: "/audio/itsy-bitsy-spider/spanish.m4a",
      },
    ],
  },
];

function SongPages({ pages }) {
  const [page, setPage] = useState(0);
  const total = pages.length;

  return (
    <div className="songbook-pages">
      <div className="songbook-page-frame">
        <img
          key={page}
          src={pages[page].src}
          alt={pages[page].alt}
          className="songbook-page-img"
        />
      </div>
      <div className="songbook-controls">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span className="songbook-page-count">
          {page + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
          disabled={page === total - 1}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function formatSongTime(s) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// Given the current playback time, figures out which page should be
// showing. If the track has hand-timed `pageBreaks` (exact seconds where
// each new page starts), those are used for a precise sync. Otherwise it
// falls back to splitting the track evenly across the pages.
function pageIndexForTime(time, duration, total, pageBreaks) {
  if (pageBreaks && pageBreaks.length > 0) {
    let idx = 0;
    for (let i = 0; i < pageBreaks.length; i++) {
      if (time >= pageBreaks[i]) idx = i + 1;
    }
    return Math.min(total - 1, idx);
  }
  return duration > 0
    ? Math.min(total - 1, Math.floor((time / duration) * total))
    : 0;
}

// A small custom "video player"-style control: the audio drives which
// illustrated page is showing. Switching language tracks resets playback
// to the start.
function SongPlayer({ tracks, pages }) {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const total = pages.length;
  const pageIndex = pageIndexForTime(
    currentTime,
    duration,
    total,
    tracks[trackIndex].pageBreaks
  );

  function selectTrack(i) {
    setTrackIndex(i);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }

  function handleScrub(e) {
    const el = audioRef.current;
    const t = Number(e.target.value);
    if (el) el.currentTime = t;
    setCurrentTime(t);
  }

  return (
    <div className="song-player">
      <div className="song-player-frame">
        <div className="song-player-frame-inner">
          {pages.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={p.alt}
              className={
                "song-player-img" + (i === pageIndex ? " active" : "")
              }
            />
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={tracks[trackIndex].src}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        className="song-player-native-audio"
      >
        Tu navegador no admite la reproducción de audio.
      </audio>

      <div className="song-player-controls">
        <button
          type="button"
          className="song-player-play"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "►"}
        </button>
        <span className="song-player-time">{formatSongTime(currentTime)}</span>
        <input
          type="range"
          className="song-player-scrub"
          min={0}
          max={duration || 0}
          step={0.05}
          value={Math.min(currentTime, duration || 0)}
          onChange={handleScrub}
          aria-label="Seek"
        />
        <span className="song-player-time">{formatSongTime(duration)}</span>
      </div>

      <div className="song-player-tracks">
        {tracks.map((t, i) => (
          <button
            key={i}
            type="button"
            className={
              "song-player-track" + (i === trackIndex ? " active" : "")
            }
            onClick={() => selectTrack(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SongEntry({ song }) {
  const hasPages = song.pages && song.pages.length > 0;
  const hasTracks = song.audioTracks && song.audioTracks.length > 0;

  return (
    <div className="song-entry">
      <div className="song-title">{song.title}</div>
      {song.description && <p className="section-note">{song.description}</p>}

      <div className="songbook">
        {song.handwrittenPhoto && (
          <div className="songbook-original">
            <img
              src={song.handwrittenPhoto.src}
              alt={song.handwrittenPhoto.alt}
              className="songbook-original-img"
            />
            <div className="songbook-caption">
              {song.handwrittenPhoto.caption}
            </div>
          </div>
        )}

        {hasPages && hasTracks ? (
          <SongPlayer tracks={song.audioTracks} pages={song.pages} />
        ) : (
          hasPages && <SongPages pages={song.pages} />
        )}
      </div>

      {!(hasPages && hasTracks) && hasTracks && (
        <div className="songbook-audio">
          {song.audioTracks.map((track, i) => (
            <div className="songbook-audio-item" key={i}>
              <div className="songbook-audio-label">{track.label}</div>
              <audio className="entry-audio" controls src={track.src}>
                Tu navegador no admite la reproducción de audio.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChildrenSongsSection() {
  return (
    <details className="panel">
      <summary>
        <span className="panel-title">
          <AudioSignalIcon /> CHILDREN'S SONGS
        </span>
        <span className="panel-count">
          {CHILDREN_SONGS.length} song{CHILDREN_SONGS.length === 1 ? "" : "s"}
        </span>
      </summary>
      <div className="panel-body">
        {CHILDREN_SONGS.map((song, i) => (
          <div key={song.key}>
            <SongEntry song={song} />
            {i < CHILDREN_SONGS.length - 1 && <div className="song-divider" />}
          </div>
        ))}
      </div>
    </details>
  );
}

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
        {description && <p className="section-note">{description}</p>}

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

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const LEARNING_STATUS_LABEL = {
  pending: "pending review",
  confirmed_correct: "confirmed correct",
  corrected: "corrected",
  rejected: "rejected",
};

// A separate, experimental, public feature — deliberately NOT the same data
// as the TRANSLATE box or the GLOSSARY below. Those only ever show real,
// already-verified archive data. This box lets Claude take a live guess at
// a translation (grounded in that same real data, via /api/guess), logs
// every guess publicly, and lets the archive keeper mark each one
// confirmed / corrected / rejected — so nothing here is ever mistaken for
// verified archive content, but everyone can watch it try and improve.
function LearningLog() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [log, setLog] = useState([]);
  const [score, setScore] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showKeeperForm, setShowKeeperForm] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [keeperError, setKeeperError] = useState("");
  const [logExpanded, setLogExpanded] = useState(false);

  async function loadLog() {
    try {
      const res = await fetch("/api/guesses");
      const data = await res.json();
      setLog(data.entries || []);
      setScore(data.score || null);
    } catch {
      // quietly ignore — the box just shows as empty until the API is reachable
    }
  }

  useEffect(() => {
    loadLog();
    fetch("/api/owner")
      .then((r) => r.json())
      .then((d) => setIsOwner(!!d.isOwner))
      .catch(() => {});
    const t = setInterval(loadLog, 20000);
    return () => clearInterval(t);
  }, []);

  async function submitGuess(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/guess", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setInput("");
        await loadLog();
      }
    } catch {
      setError("Couldn't reach the guessing feature just now.");
    } finally {
      setBusy(false);
    }
  }

  async function signInAsKeeper(e) {
    e.preventDefault();
    setKeeperError("");
    try {
      const res = await fetch("/api/owner", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        setKeeperError("that passcode isn't right.");
        return;
      }
      setIsOwner(true);
      setShowKeeperForm(false);
      setPasscode("");
    } catch {
      setKeeperError("couldn't sign in just now.");
    }
  }

  async function signOutKeeper() {
    try {
      await fetch("/api/owner", { method: "DELETE" });
    } catch {}
    setIsOwner(false);
  }

  async function scoreEntry(id, status) {
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) loadLog();
    } catch {}
  }

  return (
    <div className="panel learning-log">
      <div className="translate-box-title">
        <span className="panel-title">
          <AudioSignalIcon /> CLAUDE IS LEARNING KAQCHIKEL
        </span>
        <span className="panel-count">experimental · unverified</span>
      </div>
      <div className="panel-body translate-box-body">
        <p className="section-note">
          A separate, public experiment. The archive keeper tests Claude's
          guesses against what's already recorded here — every guess is
          logged below, unverified, until it's reviewed. Guessing itself is
          kept to the archive keeper only; anyone can watch.
        </p>

        {score && score.total > 0 && (
          <div className="score-readout">
            {score.total} guess{score.total === 1 ? "" : "es"} logged so far
            · {score.confirmed} confirmed correct · {score.corrected}{" "}
            corrected · {score.rejected} rejected · {score.pending} awaiting
            review
          </div>
        )}

        <div className="keeper-row">
          {isOwner ? (
            <span className="source-badge owner">
              🔑 signed in as archive keeper —{" "}
              <button type="button" className="link-btn" onClick={signOutKeeper}>
                sign out
              </button>
            </span>
          ) : showKeeperForm ? (
            <form className="owner-gate" onSubmit={signInAsKeeper}>
              <input
                type="password"
                placeholder="archive keeper passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button type="submit" className="link-btn">
                enter
              </button>
              {keeperError && <span className="keeper-error">{keeperError}</span>}
            </form>
          ) : (
            <button
              type="button"
              className="link-btn"
              onClick={() => setShowKeeperForm(true)}
            >
              sign in as archive keeper
            </button>
          )}
        </div>

        {isOwner ? (
          <form onSubmit={submitGuess}>
            <div className="search-field">
              <input
                type="text"
                placeholder="type a word or short phrase — Kaqchikel, Spanish, or English…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={120}
                disabled={busy}
              />
            </div>
            <button
              type="submit"
              className="guess-submit"
              disabled={busy || !input.trim()}
            >
              {busy ? "asking Claude…" : "ask Claude"}
            </button>
          </form>
        ) : (
          <p className="keeper-only-note">
            only the archive keeper can ask Claude for a guess right now —
            anyone can still watch the results below.
          </p>
        )}
        {error && <div className="empty-state">{error}</div>}

        <div className="learning-log-feed">
          {log.length === 0 ? (
            <div className="empty-state">
              no guesses logged yet — be the first to try one above.
            </div>
          ) : (
            <button
              type="button"
              className="log-toggle"
              onClick={() => setLogExpanded((v) => !v)}
              aria-expanded={logExpanded}
            >
              {logExpanded
                ? `▲ hide log`
                : `▼ view log (${log.length})`}
            </button>
          )}
          {logExpanded && (
          <div className="log-entries-scroll">
          {log.map((row) => (
            <div className="log-entry" key={row.id}>
              <div className="entry-head">
                <span
                  className={
                    "source-badge " +
                    (row.source_type === "owner" ? "owner" : "visitor")
                  }
                >
                  {row.source_type === "owner" ? "🔑 archive keeper" : "🌐 visitor"}
                </span>
                <span className={"status-badge " + row.status}>
                  {LEARNING_STATUS_LABEL[row.status] || row.status}
                </span>
                <span className="log-time">{timeAgo(row.created_at)}</span>
              </div>
              <div className="definition">
                <span className="lang-label">asked</span> {row.input_text}
              </div>
              {row.guessed_kaqchikel && (
                <div className="definition">
                  <span className="lang-label">kaq</span>{" "}
                  {row.guessed_kaqchikel}
                </div>
              )}
              {row.guessed_spanish && (
                <div className="definition">
                  <span className="lang-label">es</span> {row.guessed_spanish}
                </div>
              )}
              {row.guessed_english && (
                <div className="definition">
                  <span className="lang-label">en</span>{" "}
                  {row.guessed_english}
                </div>
              )}
              {row.ai_note && <div className="literal-note">{row.ai_note}</div>}
              {isOwner && row.status === "pending" && (
                <div className="review-actions">
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => scoreEntry(row.id, "confirmed_correct")}
                  >
                    ✅ correct
                  </button>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => scoreEntry(row.id, "corrected")}
                  >
                    ✏️ needs correction
                  </button>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => scoreEntry(row.id, "rejected")}
                  >
                    ❌ reject
                  </button>
                </div>
              )}
            </div>
          ))}
          </div>
          )}
        </div>
      </div>
    </div>
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
      </header>

      <div className="tech-stack-bar">
        <span className="tech-stack-item">
          <img src="/logos/nextjs.svg" alt="" className="tech-stack-icon" />
          Next.js
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">
          <img src="/logos/nodejs.png" alt="" className="tech-stack-icon" />
          Node.js
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">
          <img src="/logos/vercel.svg" alt="" className="tech-stack-icon" />
          Vercel
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">
          <img src="/logos/github.svg" alt="" className="tech-stack-icon" />
          GitHub
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">
          <img src="/logos/neon.svg" alt="" className="tech-stack-icon" />
          Neon Postgres
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">
          <img src="/logos/anthropic.svg" alt="" className="tech-stack-icon" />
          Anthropic API (Haiku)
        </span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">Claude AI</span>
        <span className="tech-stack-sep">·</span>
        <span className="tech-stack-item">Mac Terminal</span>
      </div>
      <p className="tech-stack-caption">
        built by Abra Kinkopf with proprietary data — any outside materials
        used for diagramming or analyzing the language are individually
        cited.
      </p>

      <div className="top-panels-row">
        <TranslateBox />
        <div className="learning-log-frame">
          <LearningLog />
        </div>
      </div>

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
          <div className="citation">
            Color-coding and Kaqchikel–Spanish–English alignment by Abra
            Kinkopf.
          </div>
        </div>
      </details>

      {audioCollections.map((collection) => (
        <AudioCollection key={collection.key} {...collection} />
      ))}

      <ChildrenSongsSection />

      <ArtSection />

      <ClarificationSection />

      <details className="panel plan-panel">
        <summary>
          <div className="plan-summary-top">
            <span className="panel-title">
              <span className="plan-toggle-icon plan-toggle-closed">[+]</span>
              <span className="plan-toggle-icon plan-toggle-open">[-]</span>{" "}
              BUILDING A TRANSLATION MODEL
            </span>
            <span className="panel-count">project plan</span>
          </div>
          <div className="plan-tools-row">
            <span className="tech-stack-item">Hugging Face</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">PyTorch</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">OpenAI Whisper</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">NLLB / mT5</span>
            <br />
            <span className="tech-stack-item">Google Colab</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">LoRA / PEFT</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">chrF eval</span>
            <span className="tech-stack-sep">·</span>
            <span className="tech-stack-item">Replicate</span>
          </div>
        </summary>
        <div className="panel-body">
          <p className="section-note">
            The long-term goal for this project is a real, standalone
            Kaqchikel translation tool — not just the search above, and not
            just the experimental Claude guess box. Here&rsquo;s the honest
            landscape it&rsquo;s starting from.
          </p>

          <div className="breakdown">
            <div className="breakdown-title">What already exists (and what doesn&rsquo;t)</div>
            <p className="section-note" style={{ marginTop: 0 }}>
              There is genuinely no Google-Translate-like tool available for
              Kaqchikel anywhere — not in Google Translate itself, not in
              Meta&rsquo;s NLLB-200, not built by the AmericasNLP research
              task. A few narrow exceptions exist and are worth naming
              honestly rather than glossing over: a 2021 AmericasNLP paper
              tested a K&rsquo;iche&rsquo;-trained tagger on Kaqchikel, and
              Hugging Face hosts a few small proof-of-concept models
              (Bible-audio text-to-speech voices, a ~1,150-clip
              children&rsquo;s-story speech recognizer). None of that is
              translation data or a usable tool — OPUS has zero Kaqchikel
              corpora, Whisper has no support, and a 2024 paper built clean
              MT datasets for 15 other Mayan languages but explicitly
              couldn&rsquo;t for this one. A scattering of artifacts, no
              foundation — this project is building its own.
            </p>
            <div className="citation">
              Sources: Tyers &amp; Howell, AmericasNLP 2021
              (aclanthology.org/2021.americasnlp-1.6). &ldquo;Curated
              Datasets and Neural Models for Machine Translation of Mayan
              Languages,&rdquo; NAACL 2024 (aclanthology.org/2024.naacl-long.156).
            </div>
          </div>

          <div className="breakdown">
            <div className="breakdown-title">Already done</div>
            <div className="plan-list">
              <div className="plan-item">
                <span className="plan-marker done"></span>
                <span>
                  The public glossary and audio above, built from real field
                  data collected over roughly 10 years.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker done"></span>
                <span>
                  The raw archive organized into a private set and a
                  separately reviewed, approved-for-public set, with every
                  file checksummed for duplicates.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker done"></span>
                <span>
                  The &ldquo;Claude is learning Kaqchikel&rdquo; guess log
                  above, kept running on purpose as an ongoing, public record
                  of what a general-purpose AI does and doesn&rsquo;t already
                  know about this language.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker done"></span>
                <span>
                  Scoping the realistic path to an actual model: fine-tuning
                  small existing models rather than training from scratch,
                  and confirming there&rsquo;s no shortcut to skip — no prior
                  Kaqchikel dataset or checkpoint exists to build on.
                </span>
              </div>
            </div>
          </div>

          <div className="breakdown">
            <div className="breakdown-title">Next steps, in order</div>
            <div className="plan-list">
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">01</span>
                  Inventory the full archive for what&rsquo;s actually usable
                  for training — sorted by whether it&rsquo;s word-level or
                  sentence-level, and whether audio has a matching
                  translation.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">02</span>
                  Build a real sentence-level parallel corpus — the biggest
                  gap, since almost everything so far is words and short
                  phrases, not full sentences.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">03</span>
                  Fine-tune Whisper on real Kaqchikel audio, since no
                  speech-to-text tool supports this language at all today.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">04</span>
                  Fine-tune a small existing translation model on the new
                  sentence corpus.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">05</span>
                  Evaluate it honestly, with metrics suited to a
                  morphologically complex language, not just a surface-level
                  score.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker"></span>
                <span>
                  <span className="plan-step-label">06</span>
                  Host the finished model and connect it to this site as a
                  real, working feature.
                </span>
              </div>
              <div className="plan-item">
                <span className="plan-marker progress"></span>
                <span>
                  <span className="plan-step-label">07 — ongoing</span>
                  Keep the guess log above running throughout, as a
                  continuous check on where AI still gets this language
                  wrong.
                </span>
              </div>
            </div>
          </div>
        </div>
      </details>

      <footer>
        A living document — entries are added as more field data is transcribed.
        <div className="footer-credit">
          Data collection: Abra Kinkopf. Speakers: MHML &amp; MJML. Written
          translations: Abra, MHML, and MJML.
        </div>
      </footer>
    </div>
  );
}
