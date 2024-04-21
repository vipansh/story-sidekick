import Link from "next/link";

import { Blog } from "../lib/supabaseClient/fetchBlog";
import { formatDate } from "../lib/utils";
import BlogImage from "./BlogImage";
import { Avatar, AvatarImage } from "./ui/avatar";
import { LayoutComponent } from "./ui/layout-comp";

export const SingleBlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
      <Link href={`/blog/${blog.id}`} passHref>
        <LayoutComponent
          layoutId={`${JSON.parse(blog.content || "{}").title}-image`}
        >
          <BlogImage
            imageUrl={blog.imageUrl}
            title={JSON.parse(blog.content || "{}").title}
            ratio={2}
          />
        </LayoutComponent>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar>
              <AvatarImage
                src={blog?.avatarUrl || "https://github.com/shadcn.png"}
              />
            </Avatar>
            <div className="ml-3">
              <div className="font-medium">{blog.email}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(blog.createdAt)}
              </div>
            </div>
          </div>
          <div className="block">
            <h3 className="text-xl font-bold mb-2 hover:underline">
              {JSON.parse(blog.content || "{}").title}
            </h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-3">
            {JSON.parse(blog.content || "{}").content.slice(0, 150)}...
          </p>
        </div>
      </Link>
    </div>
  );
};
