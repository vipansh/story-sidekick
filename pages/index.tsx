import Head from "next/head";
import styles from "../styles/Home.module.css";
import Form from "../@/components/Form";
import AllBlogsCard from "../@/components/AllBlogsCard";
import { Suspense } from "react";
import Loader from "../@/components/Loader";
import { getAllBlogs } from "../@/lib/supabaseClient/fetchBlog";
import { Button } from "../@/components/ui/button";
import { login } from "../@/lib/supabaseClient/auth";

export const runtime = "experimental-edge";

export default function Home({ blogs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Story sidekick</title>
        <meta name="description" content="Generated blogs with AI" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://story-sidekick.pages.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Story sidekick" />
        <meta property="og:description" content="Generated blogs with AI" />
        <meta property="og:image" content="" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="story-sidekick.pages.dev" />
        <meta
          property="twitter:url"
          content="https://story-sidekick.pages.dev/"
        />
        <meta name="twitter:title" content="Story sidekick" />
        <meta name="twitter:description" content="Generated blogs with AI" />
        <meta name="twitter:image" content="" />

        {/* Meta Tags Generated via https://www.opengraph.xyz */}
      </Head>

      <main className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">
        <Form />
        <Button onClick={login} variant="secondary">
          Login
        </Button>
        <Suspense
          fallback={
            <div>
              <Loader message="Loading blogs..." />
            </div>
          }
        >
          <AllBlogsCard blogs={blogs.data} />
        </Suspense>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const blogs = await getAllBlogs();
  return { props: { blogs } };
};
