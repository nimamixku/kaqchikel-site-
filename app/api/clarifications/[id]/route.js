import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../../lib/ownerAuth";
import { query } from "../../../../lib/db";

export const runtime = "nodejs";

// Owner-only: edit a clarification's text and/or toggle it resolved. This is
// the single source of truth for these notes — editing here is the only
// place they live, so a fix shows up wherever the panel is read from.
export async function PATCH(req, { params }) {
  if (!isOwnerRequest(req)) {
    return NextResponse.json(
      { error: "Only the archive keeper can edit clarifications." },
      { status: 403 }
    );
  }

  const { id } = params;
  const body = await req.json().catch(() => ({}));

  const fields = [];
  const values = [];
  let i = 1;

  if (typeof body.source === "string") {
    fields.push(`source = $${i++}`);
    values.push(body.source.trim());
  }
  if (typeof body.item === "string") {
    fields.push(`item = $${i++}`);
    values.push(body.item.trim());
  }
  if (typeof body.question === "string") {
    fields.push(`question = $${i++}`);
    values.push(body.question.trim());
  }
  if (typeof body.note === "string") {
    fields.push(`note = $${i++}`);
    values.push(body.note.trim());
  }
  if (typeof body.resolved === "boolean") {
    fields.push(`resolved = $${i++}`);
    values.push(body.resolved);
  }

  if (!fields.length) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  fields.push(`updated_at = now()`);
  values.push(id);

  const { rows } = await query(
    `update clarifications set ${fields.join(", ")} where id = $${i} returning *`,
    values
  );

  if (!rows.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ entry: rows[0] });
}

// Owner-only: remove a clarification entirely (for notes flagged by mistake).
export async function DELETE(req, { params }) {
  if (!isOwnerRequest(req)) {
    return NextResponse.json(
      { error: "Only the archive keeper can remove clarifications." },
      { status: 403 }
    );
  }

  const { id } = params;
  await query(`delete from clarifications where id = $1`, [id]);
  return NextResponse.json({ ok: true });
}
