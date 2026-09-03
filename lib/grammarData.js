// GRAMMAR section data — morpheme-level breakdowns from Abra's own working
// notes (originally posted as a tweet thread) while translating a personal
// project. Deliberately excludes the source song/lyrics themselves (those
// live only in the ART section as a single word-bank piece, same pattern
// as every other song there) — this file only holds the isolated 2-6 word
// phrases she pulled out to explain, plus the grammatical notes and
// citations that go with each one. Nothing here identifies the song.
//
// Structure mirrors lib/glossaryData.js on purpose: `phrase`/`gloss` plus a
// flat `morphemes` list is exactly the shape that can later feed the
// glossary search and the guess-log's grounding context, the same way
// `entries` in glossaryData.js already does.
//
// Marked [~] page by page in GRAMMAR_STATUS below — first pass, not final;
// going through these together to decide what stays, what gets trimmed,
// and what gets merged into EXAMPLE SENTENCES instead.

export const grammarNotes = [
  {
    id: "man-ronojel-ta",
    image: "rootofall4.png",
    phrase: "man ronojel ta",
    gloss: "it isn't everything",
    morphemes: [
      "ri — the (article)",
      "mero — money",
      "yalan — too much",
      "ruchuq'a — fuerza / power",
      "pa kiwi' — over, on top of (like pa ruwi')",
      "ri winaqi' — the people",
      "man- ... -ta — negation, wrapping ronojel (todos / all / everything): man ronojel ta = it isn't everything",
    ],
  },
  {
    id: "man-qitzij-ta",
    image: "rootofall5.png",
    phrase: "chupam k'aslem, man qitzij ta",
    gloss: "inside life, it's not true",
    morphemes: [
      "chupam — in / inside / adentro / dentro de",
      "k'aslem — la vida / life",
      "man- qitzij -ta — it's not true (qitzij = truth, la verdad)",
      "qi- — tentative 'we' prefix (normally 'qa'), + tzij (word) — \"ja qitzij\" is used when affirming something is true",
    ],
    note: "Cross-checked against a photographed page from a Kaqchikel–Spanish dictionary (the k'utunïk — show/ask/point/teach — paradigm).",
  },
  {
    id: "ninkut",
    image: "rootofall6.png",
    phrase: "nink'ut",
    gloss: "I teach / I show",
    morphemes: [
      "nin- — 1st person singular ergative prefix (\"I\")",
      "k'ut — verb stem, from k'utunïk: to show, demonstrate, teach",
    ],
    note: "Independently cross-checked against a published Kaqchikel Bible translation (Proverbs 4:2), which uses the same verb form — cited as outside confirmation, not reproduced here.",
  },
  {
    id: "man-yitzuun-ta-chwij",
    image: "rootofall7.png",
    phrase: "man yitzu'un ta chwij",
    gloss: "I don't look back",
    morphemes: [
      "chi — desde (from/since)",
      "ronojel — everything, todo, entero",
      "man- yitzu'un -ta — yi- (\"I\") + tzu'unïk (mirar, ver — to look, to see) + negation",
      "chwij — reflexive here, used figuratively for \"back\"",
    ],
    note: "Cross-checked against two independent published Bible-translation examples using yitzu'un (Mark 10:51, Psalm 6) as outside confirmation of the word's meaning.",
  },
  {
    id: "chupuchut",
    image: "rootofall8.png",
    phrase: "chupuchut",
    gloss: "blink — literally \"a light almost extinguished\"",
    morphemes: [
      "manjun b'ey — not once; literally \"the path / the way / the street\", used idiomatically for occurrence",
      "ni- chupuchut — ni- (\"I\") + chupuchut, used here for \"blink\", but the dictionary sense is closer to opaque / a light almost extinguished",
      "possibly related to chupuj / chupunïk — apagar (to extinguish)",
    ],
    citation: "Cited against Larry Richman's published Diccionario Español–Cakchiquel–Inglés entry for chupuchut.",
  },
  {
    id: "pwaqbal",
    image: "rootofall9.png",
    phrase: "pwaqb'äl",
    gloss: "bank / capital",
    morphemes: ["pwaq — money", "-b'äl — place/instrument-forming suffix"],
    citation: "A page photographed directly from the source Kaqchikel–Spanish dictionary, kept for reference.",
  },
  {
    id: "yin-ko-pa-pwaqbal",
    image: "rootofall10.png",
    phrase: "yin k'o pa pwaqb'äl chupam",
    gloss: "I'm in the bank, inside",
    morphemes: [
      "yin — yo (I)",
      "k'o — to be, estar",
      "pa — in, to, at",
      "pwaqb'äl — bank (pwaq = money)",
      "chupam — adentro, inside",
    ],
    note: "Also includes a separate, independent example sentence (not tied to the same source, or to the translation project) about thieves entering a bank — her own example, already color-coded.",
    // A real example-sentence card, same pattern as EXAMPLE SENTENCES above.
    // Only two rows (kaq/en) because that's what she actually wrote here --
    // no Spanish version exists for this one, so none is invented.
    sentenceRows: [
      {
        lang: "kaq",
        chunks: [
          { text: "Ri xitpwaqb'äl", color: "yellow" },
          { text: "ri akuchi", color: "orange" },
          { text: "ninyäk", color: "blue" },
          { text: "nupwaq", color: "purple" },
          { text: "xe'ok", color: "green" },
          { text: "eleq'oma'", color: "pink" },
          { text: "chupam…", color: null },
        ],
      },
      {
        lang: "en",
        chunks: [
          { text: "Thieves", color: "pink" },
          { text: "entered", color: "green" },
          { text: "the bank", color: "yellow" },
          { text: "where", color: "orange" },
          { text: "I was keeping", color: "blue" },
          { text: "my money", color: "purple" },
          { text: "…", color: null },
        ],
      },
    ],
    sentenceCitation: "Example sentence and color-coding by Abra Kinkopf. Sentence trails off as originally written -- not cut short here.",
  },
  {
    id: "chwij-reflexive",
    image: "rootofall11.png",
    phrase: "chwij",
    gloss: "reflexive marker, 1st person (\"myself / on me\")",
    morphemes: [],
    citation: "Cross-referenced against dictionary example sentences using chwij reflexively.",
  },
  {
    id: "man-katzinel-ta",
    image: "rootofall12.png",
    phrase: "man k'atzinel ta",
    gloss: "it's not necessary",
    morphemes: [
      "yin — yo (I)",
      "nojin — from nojij: pensar, to think",
      "we — si/if; situationally used more like \"how\" — connects a lot of conditional sentences in Kaqchikel",
      "man- k'atzinel -ta — negation wrapping k'atzinel (necessary)",
    ],
  },
  {
    id: "chi-preposition",
    image: "rootofall13.png",
    image2: "rootofall14.png",
    phrase: "chi",
    gloss: "a preposition with a wide range of uses — \"at / in / from / for\" — and the base of many Guatemalan place names",
    morphemes: [],
    note: "Two photographed dictionary spreads showing chi's range: allí/por ahí, contra, exterior, entre, interior, delante de, desde, en, para — plus a long list of place names built the same way (Chi Xalapan → Jalapa, Chi B'ukulew → Izabal, Chi Uwi La → Chichicastenango, and more). Rich enough to become its own mini-lesson on place-name formation.",
  },
  {
    id: "yineleq-pwaqbal",
    image: "rootofall15.png",
    phrase: "achike rub'anikil richin yineleq' ri pwäqb'äl",
    gloss: "what's the way to rob the bank",
    morphemes: [
      "ninojij — I think (ni- 1st person + -nojij)",
      "achike — what",
      "rub'anikil — la forma, the way, the condition/state",
      "richin — with, como, how",
      "yineleq' — yin (1st person) + eleq' (rob, steal) = I steal/rob",
      "ri pwäqb'äl — the bank",
    ],
  },
];

// Page-by-page review status: everything starts unreviewed ("~") until
// it's actually looked at together and confirmed, trimmed, or merged
// elsewhere. Update as each one gets decided.
export const GRAMMAR_STATUS = Object.fromEntries(
  grammarNotes.map((n) => [n.id, "~"])
);
