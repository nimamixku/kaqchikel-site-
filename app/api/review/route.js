import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../lib/ownerAuth";
import { query } from "../../../lib/db";

export const runtime = "nodejs";

const ALLOWED_STATUSES = ["pending", "confirmed_correct", "corrected", "rejected"];

// Owner-only: this is "the scoring" — marking a logged guess confirmed,
// corrected, or rejected. Nothing here writes back into the real glossary;
// it only updates this guess's status in the separate log.
export async function POST(req) {
  if (!isOwnerRequest(req)) {
    return NextResponse.json(
      { error: "Only the archive keeper can score entries." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { id, status, reviewerNotes } = body || {};

  if (!id || !ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid review payload." }, { status: 400 });
  }

  const { rows } = await query(
    `update guess_log set status=$1, reviewer_notes=$2, reviewed_at=now() where id=$3 returning *`,
    [status, reviewerNotes || null, id]
  );

  if (!rows.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ entry: rows[0] });
}
