import { getAllBlogs } from "../lib/supabase";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { formetDate } from "../lib/utils";
import { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

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
        <Card key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-4">
            <Link href={`/blog/${blog.id}`} passHref>
              <AspectRatio ratio={4 / 3} className="relative">
                <Image
                  alt={blog.title}
                  src={blog.imageUrl}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </AspectRatio>
              <div className="mt-2">
                <h4 className="text-xl font-semibold">{blog.title}</h4>
                <p className="text-gray-500">{formetDate(blog.created_at)}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllBlogsCard;
