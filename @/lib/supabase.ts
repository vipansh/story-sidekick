const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_key;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const getServiceSupabase = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};

