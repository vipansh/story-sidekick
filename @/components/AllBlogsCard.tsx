import { getAllBlogs } from "../lib/supabase";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { formetDate } from "../lib/utils";
import { useEffect, useState } from "react";

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
        <Card key={blog.id}>
          <CardContent>
            <Link href={`/blog/${blog.id}`} passHref>
              <Image
                alt={blog.title}
                src={blog.imagePath}
                width={200}
                height={200}
                //     layout="responsive"
              />
              <div>
                <h4 className="font-medium">{blog.title}</h4>
                <p>{formetDate(blog.created_at)}</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllBlogsCard;
