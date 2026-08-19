import { NextResponse } from "next/server";
import { OWNER_COOKIE_NAME, ownerToken, isOwnerRequest } from "../../../lib/ownerAuth";

export const runtime = "nodejs";

// Lets the archive keeper (and only the archive keeper) sign in so their
// own test guesses get tagged "owner" instead of "visitor" in the public
// log, and so they get the review buttons. Requires ARCHIVE_KEEPER_PASSCODE
// to be set — see SETUP_LEARNING_LOG.md.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const passcode = (body?.passcode || "").toString();
  const token = ownerToken();

  if (!token || !passcode || passcode !== process.env.ARCHIVE_KEEPER_PASSCODE) {
    return NextResponse.json({ error: "That passcode isn't right." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(OWNER_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}

export async function GET(req) {
  return NextResponse.json({ isOwner: isOwnerRequest(req) });
}
