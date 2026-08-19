// Tells apart "the archive keeper" (nimamixku) from an anonymous public
// visitor, for the Learning Log feature — nothing more elaborate than a
// shared passcode, hashed into a cookie value so the raw passcode itself
// never sits in the visitor's browser.
//
// Set ARCHIVE_KEEPER_PASSCODE in your environment variables to enable this.
// Until it's set, the "sign in as archive keeper" control simply won't
// authenticate anyone — the site still works fine for public guessing.

import crypto from "crypto";

export const OWNER_COOKIE_NAME = "archive_keeper";

export function ownerToken() {
  const passcode = process.env.ARCHIVE_KEEPER_PASSCODE;
  if (!passcode) return null;
  return crypto.createHash("sha256").update("keeper|" + passcode).digest("hex");
}

export function isOwnerRequest(req) {
  const token = ownerToken();
  if (!token) return false;
  const cookie = req.cookies.get(OWNER_COOKIE_NAME)?.value;
  return cookie === token;
}

export function hashIp(ip) {
  const salt = process.env.IP_HASH_SALT || "kaqchikel-learning-log";
  return crypto.createHash("sha256").update(salt + "|" + (ip || "unknown")).digest("hex");
}
