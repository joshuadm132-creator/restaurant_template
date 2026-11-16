import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);

// The publishable key is safe to use in the browser when Row Level Security is configured correctly. Never put a Supabase secret/service-role key in a NEXT_PUBLIC_ variable