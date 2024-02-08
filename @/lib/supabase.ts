const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.log({supabaseUrl ,supabaseAnonKey,supabaseServiceRoleKey})
  throw new Error("Supabase URL and Service Key must be defined");
}

export const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);


export const getServiceSupabase = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};

export const getBlogById = async (id: number) => {
  const blog = await supabaseClient
    .from("blogs")
    .select()
    .eq("id", id)
    .single();
  return blog;
};

export const getAllBlogs = async () => {
  const allBlogs = await supabaseClient
    .from("blogs")
    .select()
    .order("created_at", { ascending: false });
  return allBlogs;
};
