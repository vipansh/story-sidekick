import React from "react";
import Markdown from "react-markdown";
import BlogCard from "./BlogCard";
import BlogHeader from "./BlogHeader";
import { Separator } from "./ui/separator";
import BlogImage from "./BlogImage";
import { CardContent } from "./ui/card";
import { FloatingButton } from "./ui/floating-button";
import { LayoutComponent } from "./ui/layout-comp";
import { BlogData } from "../lib/supabase";

const BlogPage: React.FC<{ blogData: BlogData }> = ({ blogData }) => {
  // const blogData = useBlogData();
  console.log({ blogData });
  if (!blogData?.content?.content) {
    return <div>Loading...</div>;
  }
  console.log({ blogData });
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
          {blogData?.content?.content?.map((section, index) => (
            <div key={index}>
              {section.data.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <CardContent>
                    <Markdown>{item}</Markdown>
                  </CardContent>

                  <Separator className="my-1" />
                </React.Fragment>
              ))}
            </div>
          ))}
        </article>
      </div>
    </BlogCard>
  );
};

export default BlogPage;
