import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Back from "../../../@/svg/Back";
import { getBlogById } from "../../../@/lib/supabase";
import { useParams } from "next/navigation";
import { Separator } from "../../../@/components/ui/separator";
import { AspectRatio } from "../../../@/components/ui/aspect-ratio";
import { Card } from "../../../@/components/ui/card";

export type DataType = {
  title: string;
  content: Content[];
};

export type Content = {
  data: string[];
};

const BlogPage = () => {
  const param = useParams<{ id: string }>();
  console.log(param);
  const id = param?.id || 2;

  const [blogData, setBlogData] = useState<{
    content: DataType;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const { data } = await getBlogById(Number(id));
      console.log({ data });
      setBlogData({
        content: JSON.parse(data?.content || `{}`),
        imageUrl: data?.imageUrl,
      });
    };

    fetchBlogData();
  }, [id]);

  console.log({ blogData });
  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="my-4 pb-16 mx-auto max-w-2xl lg:max-w-4xl p-6 md:p-8 py-12 bg-white shadow-lg rounded-lg">
      <nav className="mb-6">
        <Link href="/" passHref>
          <div className="flex items-center space-x-3 text-blue-600 hover:text-blue-800">
            <Back />
            <span>Back to Home</span>
          </div>
        </Link>
      </nav>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "56.25%",
          }}
        >
          <Image
            alt={blogData?.content?.title || "Blog Image"}
            src={blogData?.imageUrl}
            layout="fill"
            objectFit="cover"
            className="rounded-md object-cover"
          />
        </div>
      </AspectRatio>
      <h3 className="mt-5 mb-3 text-2xl font-semibold text-gray-800">
        {blogData?.content?.title}
      </h3>
      <article className="prose lg:prose-lg max-w-none">
        {blogData?.content?.content?.map((items, index) =>
          items.data.map((item, index) => (
            <div key={index}>
              <Markdown>{item}</Markdown>
              <Separator className="my-1" />
            </div>
          ))
        )}
      </article>
    </Card>
  );
};

export default BlogPage;
