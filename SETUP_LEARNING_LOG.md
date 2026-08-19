# "Claude is Learning Kaqchikel" — setup

This is a separate, public box on the site (next to TRANSLATE) where you —
the archive keeper — can type a word or phrase and get a live guess from
Claude at its Kaqchikel/Spanish/English translation. Every guess is logged
publicly with a status (pending / confirmed correct / corrected /
rejected), and you can review and score them from the site itself. It
never touches the real glossary — nothing here becomes "official" until
you say so.

**Guessing is locked to you, the archive keeper — enforced on the
server, not just hidden in the UI.** Anyone can visit the box and watch
the public log, but only you (signed in) can actually trigger a guess.
That's what keeps the cost bounded: it's real API usage, but only from
your own testing, not from anyone who wanders by.

Two things only you can do (I can't create accounts or spend your money
on your behalf), then it's live:

## 1. Add a small database

The log needs somewhere to live. Easiest path if you're on Vercel already:

1. Open your project on vercel.com → **Storage** tab → **Create Database** → **Postgres**.
2. Follow the prompts (any region is fine) and connect it to this project.
3. Vercel automatically adds a `POSTGRES_URL` environment variable to your
   project — you don't need to copy/paste anything.

(If you'd rather use Supabase or Neon instead, that's fine too — just add
the connection string as an environment variable named `DATABASE_URL` in
Vercel's project settings.)

Then create the one table it needs — the database starts empty. You need
to run the SQL in `db/schema.sql` once against it. The simplest way: in
the Vercel dashboard, open your Postgres database → there's a **Query** /
SQL editor tab → paste in the contents of `db/schema.sql` → run it.
That's it — one table called `guess_log`.

## 2. Get an Anthropic API key — and prepay a small, fixed amount

1. Go to console.anthropic.com and create an API key.
2. Under **Settings → Billing**, buy a small amount of prepaid credit —
   $5 is plenty to start. This is a hard spending cap: the API can never
   charge you more than the balance you put in.
3. Leave **auto-reload turned off**. That's the setting that would
   automatically buy more credit when the balance runs low — with it off,
   once your $5 (or whatever you chose) is used up, guessing just stops
   working until you manually add more. No surprise bill, no recurring
   charge.
4. In Vercel: your project → **Settings** → **Environment Variables** → add
   `ANTHROPIC_API_KEY` with that key.
5. Add `ARCHIVE_KEEPER_PASSCODE` too — pick any passcode only you know.
   This is what signs you in as the archive keeper on the site, which is
   what unlocks the guess button in the first place (nobody else sees it).

**Roughly what it costs**: each guess is a small API call — well under a
cent, typically a fraction of a cent. $5 of credit is enough for
thousands of guesses at your own pace.

Until both of these are set up, the box still renders fine — the guess
button just won't appear (or, if you're signed in without a key
configured yet, it'll fall back to a free local guesser rather than
breaking).

## Signing in as the archive keeper

Once `ARCHIVE_KEEPER_PASSCODE` is set, there's a small "sign in as archive
keeper" link under the box. Signed in, you get the guess button itself,
your guesses get tagged 🔑, and you get the ✅ / ✏️ / ❌ buttons to score
every pending guess. Signing in is just a cookie in your own browser —
nothing to install.

## What's new in the codebase, if you're curious

- `lib/glossaryData.js` — the real archive data (entries, intake
  recordings, word recordings) and search logic, pulled out of `app/page.js`
  into its own file so both the site's UI and the new API routes can share
  it as one source of truth. Also where the free fallback guesser,
  `guessTranslation()`, lives.
- `lib/db.js`, `lib/ownerAuth.js` — small helpers for the database
  connection and telling you apart from a visitor.
- `app/api/guess`, `app/api/guesses`, `app/api/owner`, `app/api/review` —
  the four small server endpoints behind the feature. `app/api/guess`
  is where the owner-only check happens, server-side.
- `db/schema.sql` — the one table it needs.
- The `LearningLog` component and its styles in `app/page.js` /
  `app/globals.css` — the box itself, framed in solid black so it always
  reads as separate from the real, verified TRANSLATE and GLOSSARY
  sections.
