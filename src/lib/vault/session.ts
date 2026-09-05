import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, getRequestProtocol, setCookie } from "@tanstack/react-start/server";
import { vaultPassword, vaultSessionSecret } from "./env";

const COOKIE = "athar_vault";

function expectedToken() {
  return createHmac("sha256", vaultSessionSecret()).update("vault-unlocked").digest("hex");
}

function equal(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function vaultUnlocked() {
  const token = getCookie(COOKIE);
  return Boolean(token && equal(token, expectedToken()));
}

export function passwordMatches(input: string) {
  return equal(input, vaultPassword());
}

export function issueVaultCookie() {
  setCookie(COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: getRequestProtocol() === "https",
  });
}

export function clearVaultCookie() {
  deleteCookie(COOKIE, { path: "/" });
}

export function requireVault() {
  if (!vaultUnlocked()) {
    const error = new Error("Unauthorized");
    error.name = "VaultAuthError";
    throw error;
  }
}
