import React from "react";
import Markdown from "react-markdown";
import BlogCard from "./BlogCard";
import BlogHeader from "./BlogHeader";
import useBlogData from "../hooks/useBlogData";
import { Separator } from "./ui/separator";
import BlogImage from "./BlogImage";
import { CardContent } from "./ui/card";
import { FloatingButton } from "./ui/floating-button";

const BlogPage: React.FC = () => {
  const blogData = useBlogData();

  if (!blogData?.content?.content) {
    return <div>Loading...</div>;
  }
  console.log({ blogData });
  return (
    <BlogCard>
      <BlogHeader />
      <FloatingButton />
      <div className=" mx-auto antialiased pt-4 relative">
        <h3 className="mt-5 mb-3 text-2xl font-semibold text-gray-800">
          {blogData.content.title}
        </h3>

        <BlogImage
          imageUrl={blogData.imageUrl}
          title={blogData.content.title}
        />

        <article className="prose lg:prose-lg max-w-none">
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
