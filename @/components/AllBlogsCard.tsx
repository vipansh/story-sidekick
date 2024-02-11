/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formetDate } from "../lib/utils";
import { LayoutComponent } from "./ui/layout-comp";
import BlogImage from "./BlogImage";
import React from "react";

type Blog = {
  id: string;
  content: string;
  created_at: string;
  title: string;
  imageUrl: string;
};

type Props = {
  blogs: Blog[];
};

const AllBlogsCard = ({ blogs }: Props) => {
  if (!blogs || blogs?.length === 0) {
    return (
      <div className="text-center py-10">No blogs available at the moment.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4">
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.id}`} passHref key={blog.id}>
          <div className=" rounded-xl group hover:shadow-xl transition-shadow duration-200 shadow-md p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 min-h-16">
              {JSON.parse(blog.content || "{}").title}
            </h3>
            <div className="text-sm text-gray-500 mt-2">
              {formetDate(blog.created_at)}
            </div>
            <div className="mt-4">
              <LayoutComponent
                layoutId={`${JSON.parse(blog.content || "{}").title}-image`}
              >
                <BlogImage
                  imageUrl={blog.imageUrl}
                  title={JSON.parse(blog.content || "{}").title}
                />
              </LayoutComponent>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllBlogsCard;
