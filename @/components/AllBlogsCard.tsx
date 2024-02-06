/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogs } from "../lib/supabase";
import { formetDate } from "../lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";
import { LayoutComponent } from "./ui/layout-comp";

type Props = {};

const AllBlogsCard = ({}: Props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllBlogs();
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    const Skeleton = () => (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
    );
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return <div>Failed to load blogs. Please try again later.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No blogs available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {data.map((blog) => (
        <Link href={`/blog/${blog.id}`} passHref key={blog.id}>
          <div className=" row-span-1 rounded-xl group/bento bg-white border border-transparent space-y-4 flex flex-col p-4 tracking-tight text-slate-100/50 w-full h-full">
            <h3 className="!pb-2 !m-0 font-bold text-base text-slate-800">
              {blog.title}
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500">
                {formetDate(blog.created_at)}
              </span>
            </div>
            <div className="flex flex-1 mt-4 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
              <AspectRatio ratio={1} className="relative w-full h-full">
                <LayoutComponent layoutId={blog.title}>
                  <img
                    alt={blog.title}
                    src={blog.imageUrl}
                    className="rounded-lg w-full h-full object-cover"
                    loading="lazy"
                  />
                </LayoutComponent>
              </AspectRatio>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllBlogsCard;
