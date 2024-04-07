import Link from "next/link";

import { Blog } from "../lib/supabaseClient/fetchBlog";
import { formatDate } from "../lib/utils";
import BlogImage from "./BlogImage";
import { LayoutComponent } from "./ui/layout-comp";

export const SingleBlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blog/${blog.id}`} passHref>
      <div className="rounded-xl group hover:shadow-xl transition-shadow duration-200 shadow-md p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 min-h-20">
          {JSON.parse(blog.content || "{}").title}
        </h3>
        <div className="text-sm text-gray-500 mt-2">
          {formatDate(blog.createdAt)}
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
  );
};
