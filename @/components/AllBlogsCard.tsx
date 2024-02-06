/* eslint-disable @next/next/no-img-element */

import { getAllBlogs } from "../lib/supabase";
import { Card } from "./ui/card";
import { formetDate } from "../lib/utils";
import { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { PinContainer } from "./ui/3d-pin";
import Link from "next/link";
import { LayoutComponent } from "./ui/layout-comp";

type Props = {};

const AllBlogsCard = ({}: Props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllBlogs();
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  console.log({ data });
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((blog) => (
        <Link href={`/blog/${blog.id}`} passHref key={blog.id}>
          <PinContainer title={blog.title} href={`/blog/${blog.id}`}>
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-800">
                {blog.title}
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  {formetDate(blog.created_at)}
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
                <AspectRatio ratio={1} className="relative">
                  <LayoutComponent layoutId={blog.title}>
                    <img
                      alt={blog.title}
                      src={blog.imageUrl}
                      className="rounded-lg w-full h-full"
                    />
                  </LayoutComponent>
                </AspectRatio>
              </div>
            </div>
          </PinContainer>
        </Link>
      ))}
    </div>
  );
};

export default AllBlogsCard;
