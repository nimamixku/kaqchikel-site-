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
//
// Lives in its own file (not app/page.js) so lib/glossaryData.js can fold
// every wordBank entry into the site's one searchable TRANSLATION_INDEX
// without a circular import back into the page component.
export const ART_PIECES = [
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
    credit: "Edward Hirsch, “Gabriel”",
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
  {
    key: "root-of-all",
    title: "Untitled",
    credit: "DJ Premier, Slick Rick & Lil Wayne, \u201cThe Root of All\u201d",
    file: "root-of-all.png",
    extraImages: ["root-of-all-notes-1.png", "root-of-all-notes-2.png"],
    wordBank: [
      { kaq: "ronojel", en: "everything / all", morph: "root only — no prefix" },
      { kaq: "mero", en: "money", morph: "root only — no prefix" },
      { kaq: "pwaqb'äl", en: "bank", morph: "pwaq (money) + -b'äl (place/instrument-forming suffix)" },
      { kaq: "nink'ut", en: "I teach / I show", morph: "nin- (I, ergative prefix) + k'ut (root: to teach, to show)" },
      { kaq: "chwij", en: "on me / myself (reflexive)", morph: "1st-person reflexive marker" },
      { kaq: "k'atzinel", en: "necessary", morph: "root only — no prefix" },
    ],
  },
];
