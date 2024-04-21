import React from "react";

import { Blog } from "../lib/supabaseClient/fetchBlog";
import { SingleBlogCard } from "./SingleBlogCard";

type Props = {
  blogs: Blog[];
};

const AllBlogsCard = ({ blogs }: Props) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-10">No blogs available at the moment.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 lg:px-8 py-12">
      {blogs.map((blog) => (
        <SingleBlogCard blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default AllBlogsCard;
