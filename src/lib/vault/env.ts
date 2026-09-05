import { createHash } from "node:crypto";

function readEnv(name: string) {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export function supabaseUrl() {
  const url =
    readEnv("SUPABASE_URL") ?? readEnv("VITE_SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL");
  if (!url) throw new Error("Missing SUPABASE_URL");
  return url;
}

export function supabaseServiceKey() {
  const key = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return key;
}

export function vaultPassword() {
  return readEnv("VAULT_PASSWORD") ?? "ayla21";
}

export function vaultSessionSecret() {
  const secret = readEnv("VAULT_SESSION_SECRET");
  if (secret && secret.length >= 32) return secret;
  return createHash("sha256").update(`athar-vault:${vaultPassword()}`).digest("hex");
}
