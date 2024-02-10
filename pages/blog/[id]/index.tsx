import React from "react";
import BlogPage from "../../../@/components/BlogPage";
import { getAllBlogs, getBlogById } from "../../../@/lib/supabase";

const index = ({ blogData }) => {
  return <BlogPage blogData={blogData} />;
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
  return { props: { blogData:{
    content: JSON.parse(data?.content || `{}`),
    imageUrl: data?.imageUrl,
  }} };
};
