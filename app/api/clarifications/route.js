import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../lib/ownerAuth";
import { query } from "../../../lib/db";

export const runtime = "nodejs";

// Public: the full list of flagged clarification notes — open ones first,
// then resolved ones — so anyone can see what's still uncertain. Adding new
// entries is owner-only.
//
// `ready` distinguishes "the table exists and is genuinely empty" from "the
// database isn't set up yet" (missing DATABASE_URL, table not created) —
// the page uses this to hide the whole LANGUAGE AMENDMENTS panel entirely
// until the one-time db/schema.sql migration has actually been run, instead
// of showing an empty-looking panel in the meantime.
export async function GET() {
  try {
    const { rows: entries } = await query(
      `select id, source, item, question, note, resolved, created_at, updated_at
       from clarifications
       order by resolved asc, created_at desc`
    );
    return NextResponse.json({ entries, ready: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ entries: [], ready: false });
  }
}

// Owner-only: flag a new clarification note.
export async function POST(req) {
  if (!isOwnerRequest(req)) {
    return NextResponse.json(
      { error: "Only the archive keeper can flag new notes." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const source = (body?.source || "").trim();
  const item = (body?.item || "").trim();
  const question = (body?.question || "").trim();
  const note = (body?.note || "").trim();

  if (!source || !item || !question || !note) {
    return NextResponse.json(
      { error: "source, item, question, and note are all required." },
      { status: 400 }
    );
  }

  const { rows } = await query(
    `insert into clarifications (source, item, question, note) values ($1, $2, $3, $4) returning *`,
    [source, item, question, note]
  );

  return NextResponse.json({ entry: rows[0] });
}
