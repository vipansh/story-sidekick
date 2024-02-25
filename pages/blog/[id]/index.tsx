import React from "react";
import BlogPage from "../../../@/components/BlogPage";
import Head from "next/head";
import {
  BlogData,
  getAllBlogs,
  getBlogById,
} from "../../../@/lib/supabaseClient/fetchBlog";

export const runtime = "experimental-edge";

const index = ({ blogData }: { blogData: BlogData }) => {
  return (
    <div>
      <Head>
        <title>{blogData.content.title}</title>
        <meta name="description" content="Generated blogs with AI" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://story-sidekick.pages.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={blogData.content.title} />
        <meta property="og:description" content="Generated blogs with AI" />
        <meta property="og:image" content={blogData.imageUrl} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={blogData.imageUrl} />
        <meta property="twitter:domain" content="story-sidekick.pages.dev" />
        <meta
          property="twitter:url"
          content="https://story-sidekick.pages.dev/"
        />
        <meta name="twitter:title" content={blogData.content.title} />
        <meta name="twitter:description" content="Generated blogs with AI" />
        <meta name="twitter:image" content={blogData.imageUrl} />

        {/* Meta Tags Generated via https://www.opengraph.xyz */}
      </Head>
      <BlogPage blogData={blogData} />;
    </div>
  );
};

export default index;

export const getStaticPaths = async () => {
  const blogs = await getAllBlogs();
  return {
    paths: blogs.data.map((blog) => ({
      params: {
        id: blog.id.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const id = params.id;
  const { data } = await getBlogById(Number(id));
  return {
    props: {
      blogData: {
        content: JSON.parse(data?.content || `{}`),
        imageUrl: data?.imageUrl,
      },
    },
    notFound: true,
  };
};
