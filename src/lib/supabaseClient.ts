import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — prevents build-time crash when env vars are absent
let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }
  _client = createClient(url, key);
  return _client;
}

// Named export kept for ergonomics — resolves lazily at call time
export const supabase = {
  from: (...args: Parameters<SupabaseClient["from"]>) =>
    getSupabaseClient().from(...args),
} as unknown as SupabaseClient;

export type LeadInsert = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};
