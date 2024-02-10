/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formetDate } from "../lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";
import { LayoutComponent } from "./ui/layout-comp";

type Props = {
  blogs: any;
  // isLoading: boolean;
};

const AllBlogsCard = ({ blogs }: Props) => {
  // if (isLoading) {
  //   const Skeleton = () => (
  //     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  //   );
  //   return (
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //       <Skeleton />
  //     </div>
  //   );
  // }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available at the moment.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {blogs?.map((blog) => (
        <Link href={`/blog/${blog.id}`} passHref key={blog.id}>
          <div className=" row-span-1 rounded-xl group/bento bg-white border border-transparent space-y-4 flex flex-col p-4 tracking-tight text-slate-100/50 w-full h-full shadow-[0_8px_16px_rgb(0_0_0/0.4)] min-w-72">
            <h3 className="pb-2 m-0 font-bold text-base text-slate-800 min-h-16 ">
              {JSON.parse(blog.content || `{}`)?.title}
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
