import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";
import Markdown from "react-markdown";

import { BlogData } from "../lib/supabaseClient/fetchBlog";
import { formatDate } from "../lib/utils";
import BlogCard from "./BlogCard";
import BlogHeader from "./BlogHeader";
import BlogImage from "./BlogImage";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
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
      <LayoutComponent layoutId={`${content.title}-image`}>
        <BlogImage imageUrl={imageUrl} title={content.title} ratio={2} />
      </LayoutComponent>
      <article className="prose prose-gray max-w-none mx-auto dark:prose-invert">
        <div className="inset-0 flex items-center justify-center my-1">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
        </div>
        <div className="mx-auto antialiased relative">
          <div className="px-4 md:px-6">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center mb-4 justify-between">
                <Avatar>
                  <AvatarImage
                    src={blogData?.avatarUrl || "https://github.com/shadcn.png"}
                  />
                </Avatar>
                <div className="ml-3">
                  <div className="font-medium">{blogData.email}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(blogData.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Pencil1Icon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            <Markdown>{content.content}</Markdown>
          </div>
        </div>
      </article>
    </BlogCard>
  );
};

export default BlogPage;
