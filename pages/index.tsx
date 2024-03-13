import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import AllBlogsCard from "../@/components/AllBlogsCard";
import { getAllBlogs } from "../@/lib/supabaseClient/fetchBlog";

import Navbar from "../@/components/navbar/Navbar";
import { InferGetServerSidePropsType } from "next";
import BlogPostCreator from "../@/components/optionsList/BlogPostCreator";

export const runtime = "experimental-edge";

const Home = ({
  blogs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div className={styles.container}>
    <Head>
      <title>Story sidekick</title>
      <meta name="description" content="Generated blogs with AI" />
      <meta property="og:url" content="https://story-sidekick.pages.dev/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Story sidekick" />
      <meta property="og:description" content="Generated blogs with AI" />
      <meta property="og:image" content="" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="story-sidekick.pages.dev" />
      <meta
        property="twitter:url"
        content="https://story-sidekick.pages.dev/"
      />
      <meta name="twitter:title" content="Story sidekick" />
      <meta name="twitter:description" content="Generated blogs with AI" />
      <meta name="twitter:image" content="" />
    </Head>
    <Navbar />
    <main className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <BlogPostCreator />
      <AllBlogsCard blogs={blogs} />
    </main>
  </div>
);

export const getServerSideProps = async () => {
  const { data: blogs } = await getAllBlogs();
  const filteredBlogs = blogs.map(({ id, content, created_at, imageUrl }) => ({
    id,
    content,
    imageUrl,
    createdAt: created_at,
  }));
  return { props: { blogs: filteredBlogs } };
};

export default Home;
