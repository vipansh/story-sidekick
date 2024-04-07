import React from "react";
import Markdown from "react-markdown";

import { BlogData } from "../lib/supabaseClient/fetchBlog";
import BlogCard from "./BlogCard";
import BlogHeader from "./BlogHeader";
import BlogImage from "./BlogImage";
import { FloatingButton } from "./ui/floating-button";
import { LayoutComponent } from "./ui/layout-comp";

const BlogPage: React.FC<{ blogData: BlogData }> = ({ blogData }) => {
  if (!blogData?.content?.content) {
    return <div>Loading...</div>;
  }

  const { content, imageUrl } = blogData;

  return (
    <BlogCard>
      <BlogHeader />
      <FloatingButton />
      <div className="mx-auto antialiased relative">
        <h1 className="mb-5 my-3 text-5xl font-semibold text-gray-800">
          {content.title}
        </h1>
        <LayoutComponent layoutId={`${content.title}-image`}>
          <BlogImage imageUrl={imageUrl} title={content.title} />
        </LayoutComponent>
        <article className="prose lg:prose-lg max-w-none mt-10">
          <Markdown>{content.content}</Markdown>
        </article>
      </div>
    </BlogCard>
  );
};

export default BlogPage;
