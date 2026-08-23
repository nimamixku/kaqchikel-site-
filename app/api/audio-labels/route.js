import { NextResponse } from "next/server";
import { isOwnerRequest } from "../../../lib/ownerAuth";
import { query } from "../../../lib/db";

export const runtime = "nodejs";

// This is entirely separate from /api/clarifications (LANGUAGE
// AMENDMENTS) -- different table, different purpose. LANGUAGE AMENDMENTS
// flags a *question* about an already-named word/phrase. This is just
// renaming/titling a clip that doesn't have a real name yet (or fixing
// one that does) -- no note, no flag, nothing added to that log.
//
// Public: every saved label, for any audio collection that uses this
// live-labeling table. `ready` mirrors the same distinction
// /api/clarifications makes: "the table exists and is empty" vs. "the
// one-time db/schema.sql migration for audio_labels hasn't been run yet"
// -- the page falls back to showing every clip by its raw filename
// (never crashes) until that setup step happens.
export async function GET() {
  try {
    const { rows } = await query(
      `select folder_name, filename, label, updated_at
       from audio_labels
       order by updated_at desc`
    );
    const labels = rows.map((r) => ({
      folderName: r.folder_name,
      filename: r.filename,
      label: r.label,
      updatedAt: r.updated_at,
    }));
    return NextResponse.json({ labels, ready: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ labels: [], ready: false });
  }
}

// Owner-only: set (or clear) the label for one audio file -- a live,
// on-the-spot way to name/rename a clip straight from the site, without
// touching the actual file or waiting on a git push.
export async function PUT(req) {
  if (!isOwnerRequest(req)) {
    return NextResponse.json(
      { error: "Only the archive keeper can rename audio." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const folderName = (body?.folderName || "").trim();
  const filename = (body?.filename || "").trim();
  const label = (body?.label ?? "").toString().trim();

  if (!folderName || !filename) {
    return NextResponse.json(
      { error: "folderName and filename are both required." },
      { status: 400 }
    );
  }

  const { rows } = await query(
    `insert into audio_labels (folder_name, filename, label, updated_at)
     values ($1, $2, $3, now())
     on conflict (folder_name, filename)
     do update set label = excluded.label, updated_at = now()
     returning folder_name, filename, label, updated_at`,
    [folderName, filename, label]
  );

  const row = rows[0];
  return NextResponse.json({
    ok: true,
    label: {
      folderName: row.folder_name,
      filename: row.filename,
      label: row.label,
      updatedAt: row.updated_at,
    },
  });
}
