// EXAMPLE SENTENCES data: full sentences color-matched across Spanish,
// Kaqchikel, and English, plus a clean word-by-word "direct translations"
// breakdown for each. Kept as data (not just JSX) for two reasons: so
// lib/glossaryData.js can fold every breakdown pair into the site's one
// searchable TRANSLATION_INDEX, and so adding a second example sentence
// later is just adding another object here, not hand-writing more markup.
export const exampleSentences = [
  {
    id: "look-me-in-the-eyes",
    sentenceRows: [
      {
        lang: "es",
        chunks: [
          { text: "Míreme", color: "yellow" },
          { text: "a los ojos", color: "green" },
          { text: "y verá", color: "orange" },
          { text: "que estoy diciendo", color: "purple" },
          { text: "la verdad.", color: "blue" },
        ],
      },
      {
        lang: "kaq",
        chunks: [
          { text: "Ta-tzu'", color: "yellow" },
          { text: "re nu-vech", color: "green" },
          { text: "y xta-tz'et", color: "orange" },
          { text: "chi", color: "indigo", title: "Uncertain match — see note below" },
          { text: "kitzij ri", color: "blue" },
          { text: "nin-bij.", color: "purple" },
        ],
      },
      {
        lang: "en",
        chunks: [
          { text: "Look me", color: "yellow" },
          { text: "in the eyes", color: "green" },
          { text: "and you will see", color: "orange" },
          { text: "that I'm telling", color: "purple" },
          { text: "the truth.", color: "blue" },
        ],
      },
    ],
    headword: "mirar — -tzu' (vt1)",
    uncertainNote: 'I think "chi" actually links to "that" for "nin-bij."',
    breakdown: [
      { color: "yellow", es: "Míreme", kaq: "Ta-tzu'", en: "Look me" },
      { color: "green", es: "a los ojos", kaq: "re nu-vech", en: "in the eyes" },
      { color: "orange", es: "y verá", kaq: "y xta-tz'et", en: "and you will see" },
      { color: "purple", es: "que estoy diciendo", kaq: "nin-bij", en: "that I'm telling" },
      { color: "blue", es: "la verdad", kaq: "kitzij ri", en: "the truth" },
      { color: "indigo", es: null, kaq: "chi", en: null, unmatched: true },
    ],
    // Plain strings, not JSX -- this is a data file, kept framework-agnostic
    // so lib/glossaryData.js (used server-side too) can import it freely.
    // The dictionary title's italics is applied at render time in page.js.
    citations: [
      {
        text: "Cited from: Diccionario Español–Cakchiquel–Inglés. Robert W. Blair, John S. Robertson, Larry Richman, Greg Sansom, Julio Salazar, Juan Yool, Alejandro Choc. Brigham Young University, Provo, Utah, U.S.A. — Language and Intercultural Research Center, New World Languages Research Division.",
        italicTitle: "Diccionario Español–Cakchiquel–Inglés",
      },
      { text: "Color-coding and Kaqchikel–Spanish–English alignment by Abra Kinkopf." },
    ],
  },
];
