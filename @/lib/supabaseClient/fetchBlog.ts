import { supabaseClient } from "../supabase";

export interface BlogData {
  content: {
    title: string;
    content: string;
  };
  imageUrl: string;
}

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

export type Blog = {
  id: string;
  content: string;
  createdAt: string;
  imageUrl: string;
};
