const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_key;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

import { createClient } from "@supabase/supabase-js";

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error("Supabase URL and Service Key must be defined");
}

console.log({ supabaseUrl, supabaseAnonKey, supabaseServiceRoleKey })
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);


export const getServiceSupabase = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};


