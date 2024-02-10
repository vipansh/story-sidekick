import React from "react";
import BlogCard from "./BlogCard";
import BlogHeader from "./BlogHeader";
import BlogImage from "./BlogImage";
import { FloatingButton } from "./ui/floating-button";
import { LayoutComponent } from "./ui/layout-comp";
import { BlogData } from "../lib/supabase";
import Markdown from "react-markdown";

const BlogPage: React.FC<{ blogData: BlogData }> = ({ blogData }) => {
  // const blogData = useBlogData();
  if (!blogData?.content?.content) {
    return <div>Loading...</div>;
  }
  return (
    <BlogCard>
      <BlogHeader />
      <FloatingButton />
      <div className=" mx-auto antialiased  relative">
        <h1 className="mb-5 my-3 text-5xl font-semibold text-gray-800 ">
          {blogData.content.title}
        </h1>
        <LayoutComponent layoutId={blogData.content.title}>
          <BlogImage
            imageUrl={blogData.imageUrl}
            title={blogData.content.title}
          />
        </LayoutComponent>

        <article className="prose lg:prose-lg max-w-none mt-10">
          <Markdown>{blogData?.content?.content}</Markdown>
        </article>
      </div>
    </BlogCard>
  );
};

export default BlogPage;
