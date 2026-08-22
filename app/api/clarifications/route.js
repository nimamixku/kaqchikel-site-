import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../lib/ownerAuth";
import { query } from "../../../lib/db";

export const runtime = "nodejs";

// Public: the full list of flagged clarification notes — open ones first,
// then resolved ones — so anyone can see what's still uncertain. Adding new
// entries is owner-only.
export async function GET() {
  try {
    const { rows: entries } = await query(
      `select id, source, item, note, resolved, created_at, updated_at
       from clarifications
       order by resolved asc, created_at desc`
    );
    return NextResponse.json({ entries });
  } catch (err) {
    console.error(err);
    // Soft-fail so the panel just renders empty until the DB is configured.
    return NextResponse.json({ entries: [] });
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
  const note = (body?.note || "").trim();

  if (!source || !item || !note) {
    return NextResponse.json(
      { error: "source, item, and note are all required." },
      { status: 400 }
    );
  }

  const { rows } = await query(
    `insert into clarifications (source, item, note) values ($1, $2, $3) returning *`,
    [source, item, note]
  );

  return NextResponse.json({ entry: rows[0] });
}
