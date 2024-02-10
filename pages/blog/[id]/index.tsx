import React, { Suspense } from "react";
import BlogPage from "../../../@/components/BlogPage";
import { BlogData, getBlogById } from "../../../@/lib/supabase";
import Head from "next/head";

export const runtime = "experimental-edge";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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
      <Suspense fallback={<p>Loading blog data...</p>}>
        <BlogPage blogData={blogData} />;
      </Suspense>
    </div>
  );
};

export default index;

export const getServerSideProps = async ({ query }) => {
  const id = query.id;
  const { data } = await getBlogById(Number(id));
  return {
    props: {
      blogData: {
        content: JSON.parse(data?.content || `{}`),
        imageUrl: data?.imageUrl,
      },
    },
  };
};
