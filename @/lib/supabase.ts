const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON;

import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

