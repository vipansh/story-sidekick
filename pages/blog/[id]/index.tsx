import React from "react";
import BlogPage from "../../../@/components/BlogPage";
import { getBlogById } from "../../../@/lib/supabase";

export const runtime = "edge";

const index = ({ blogData }) => {
  return <BlogPage blogData={blogData} />;
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
