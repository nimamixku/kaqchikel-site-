// Tiny Postgres helper for the "Claude is learning Kaqchikel" feature.
//
// This is a completely separate store from the real archive data in
// lib/glossaryData.js / app/*.json — nothing written here ever touches the
// verified glossary. It just logs guesses + reviews so they can be watched
// and scored.
//
// Needs a DATABASE_URL (or POSTGRES_URL, which Vercel's own Postgres
// integration sets automatically) environment variable pointing at a
// Postgres database. See SETUP_LEARNING_LOG.md at the repo root for how to
// set one up — this file intentionally does nothing until that exists.

import { Pool } from "pg";

let pool;

function getPool() {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING;

    if (!connectionString) {
      throw new Error(
        "No database configured. Set DATABASE_URL (or POSTGRES_URL) in your environment variables — see SETUP_LEARNING_LOG.md."
      );
    }

    pool = new Pool({
      connectionString,
      // Most managed Postgres providers (Vercel Postgres, Supabase, Neon,
      // Render) require SSL and hand out a connection string that already
      // says so; this just avoids failing on a self-signed chain.
      ssl: connectionString.includes("sslmode=disable")
        ? false
        : { rejectUnauthorized: false },
      max: 3,
    });
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}
