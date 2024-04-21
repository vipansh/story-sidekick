import Head from "next/head";
import React from "react";

import BlogPage from "../../../@/components/BlogPage";
import { BlogData, getBlogById } from "../../../@/lib/supabaseClient/fetchBlog";

export const runtime = "experimental-edge";

interface BlogProps {
  blogData: BlogData;
}

const Blog = ({ blogData }: BlogProps) => (
  <div>
    <Head>
      <title>{blogData.content.title}</title>
      <meta name="description" content="Generated blogs with AI" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:url" content="https://story-sidekick.pages.dev/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={blogData.content.title} />
      <meta property="og:description" content="Generated blogs with AI" />
      <meta property="og:image" content={blogData.imageUrl} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="story-sidekick.pages.dev" />
      <meta
        property="twitter:url"
        content="https://story-sidekick.pages.dev/"
      />
      <meta name="twitter:title" content={blogData.content.title} />
      <meta name="twitter:description" content="Generated blogs with AI" />
      <meta name="twitter:image" content={blogData.imageUrl} />
    </Head>
    <BlogPage blogData={blogData} />
  </div>
);

export default Blog;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await getBlogById(Number(id));
  const blogData = {
    ...data,
    content: JSON.parse(data?.content || "{}"),
    createdAt: data.created_at,
  };

  return { props: { blogData } };
}
