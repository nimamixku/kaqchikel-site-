# "Claude is Learning Kaqchikel" — setup

This is a new, separate public box on the site (right under TRANSLATE) where
anyone can type a word or phrase and get a live guess from Claude at its
Kaqchikel/Spanish/English translation. Every guess is logged publicly with
a status (pending / confirmed correct / corrected / rejected), and you (the
archive keeper) can review and score them from the site itself. It never
touches the real glossary — nothing here becomes "official" until you say so.

It pulls its grounding straight from the site's real data (the glossary
entries, word recordings, and intake recordings), so as that grows, what
Claude can reasonably guess from grows with it too.

Three things only you can do (I can't create accounts or spend your money
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

## 2. Create the table (one time)

The database starts empty. You need to run the SQL in `db/schema.sql` once
against it. The simplest way: in the Vercel dashboard, open your Postgres
database → there's a **Query** / SQL editor tab → paste in the contents of
`db/schema.sql` → run it. That's it — one table called `guess_log`.

## 3. Get an Anthropic API key

1. Go to console.anthropic.com and create an API key (if you don't already
   have one for other purposes).
2. In Vercel: your project → **Settings** → **Environment Variables** → add
   `ANTHROPIC_API_KEY` with that key.

**This is the one with a real cost**: every guess a visitor (or you) submits
makes one small API call, billed to that Anthropic account. To keep that
bounded, I built in two safety caps you can adjust any time as environment
variables:

- `MAX_GUESSES_PER_IP_PER_DAY` — default 15. Stops one visitor (or a bot)
  from hammering it.
- `MAX_DAILY_GUESSES` — default 150. A hard ceiling across *everyone*,
  regardless of how many different visitors show up, so a viral moment
  can't produce a surprise bill. Once hit, the box just says "check back
  tomorrow" until the next day.

Raise or lower either any time in Vercel's environment variables — no code
change needed.

## Optional: sign in as the archive keeper

So the log can tell "your own testing" apart from an anonymous visitor's
submission, add one more environment variable:

- `ARCHIVE_KEEPER_PASSCODE` — pick any passcode only you know.

Once set, there's a small "sign in as archive keeper" link under the guess
box. Signed in, your guesses get tagged 🔑 instead of 🌐, your testing skips
the rate limit, and you get the ✅ / ✏️ / ❌ buttons to score every pending
guess. Signing in is just a cookie in your own browser — nothing to install.

## After adding the environment variables

Redeploy the site (Vercel does this automatically on the next push, or you
can trigger a redeploy manually) so it picks up the new environment
variables. Until the database and API key are set, the box still renders
fine — it just says guessing isn't switched on yet / shows no guesses.

## What's new in the codebase, if you're curious

- `lib/glossaryData.js` — the real archive data (entries, intake
  recordings, word recordings) and search logic, pulled out of `app/page.js`
  into its own file so both the site's UI and the new API routes can share
  it as one source of truth. Nothing about how you add new entries changed
  — same array, just in a new file.
- `lib/db.js`, `lib/ownerAuth.js` — small helpers for the database
  connection and telling you apart from a visitor.
- `app/api/guess`, `app/api/guesses`, `app/api/owner`, `app/api/review` —
  the four small server endpoints behind the feature.
- `db/schema.sql` — the one table it needs.
- The `LearningLog` component and its styles in `app/page.js` /
  `app/globals.css` — the box itself, styled to match the rest of the site
  but with a dashed border so it always reads as separate from the real,
  verified TRANSLATE and GLOSSARY sections.
