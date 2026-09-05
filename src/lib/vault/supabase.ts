import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseServiceKey, supabaseUrl } from "./env";

let admin: SupabaseClient | undefined;

export const VAULT_BUCKET = "vault-videos";

export function supabaseAdmin() {
  admin ??= createClient(supabaseUrl(), supabaseServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return admin;
}
