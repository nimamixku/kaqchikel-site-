import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export const runtime = "nodejs";

// Public: the recent log + running score, so anyone can watch Claude try
// and see how it's doing. Never touches the real glossary data.
export async function GET() {
  try {
    const { rows: entries } = await query(
      `select id, source_type, input_text, guessed_kaqchikel, guessed_spanish, guessed_english,
              confidence, ai_note, status, created_at
       from guess_log
       order by created_at desc
       limit 40`
    );
    const { rows: scoreRows } = await query(
      `select
         count(*)::int as total,
         count(*) filter (where status = 'confirmed_correct')::int as confirmed,
         count(*) filter (where status = 'corrected')::int as corrected,
         count(*) filter (where status = 'rejected')::int as rejected,
         count(*) filter (where status = 'pending')::int as pending
       from guess_log`
    );
    return NextResponse.json({ entries, score: scoreRows[0] });
  } catch (err) {
    console.error(err);
    // Soft-fail so the box just renders empty until the DB is configured,
    // instead of throwing a hard error at every visitor.
    return NextResponse.json({ entries: [], score: null });
  }
}
