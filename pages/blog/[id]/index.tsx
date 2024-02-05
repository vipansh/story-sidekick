import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Back from "../../../@/svg/Back";
import { getBlogById } from "../../../@/lib/supabase";
import { useParams } from "next/navigation";

const BlogPage = () => {
  const param = useParams<{ id: string }>();
  console.log(param);
  const id = param?.id || 2;

  const [blogData, setBlogData] = useState<{
    content: { title: string; content: { data: string }[] };
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const { data } = await getBlogById(Number(id));
      setBlogData({
        content: JSON.parse(data.content),
        imageUrl: data.mageUrl,
      });
    };

    fetchBlogData();
  }, [id]);

  console.log({ blogData });
  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-xl p-4 py-12">
      <nav className="my-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2">
            <Back />
            <span>Back</span>
          </div>
        </Link>
      </nav>
      <Image
        alt={blogData.content.title || "Blog Image"}
        src={blogData.imageUrl}
        width={800}
        height={300}
        layout="responsive"
      />
      <article className="prose">
        {blogData.content.content.map((item, index) => (
          <Markdown key={index}>{item.data}</Markdown>
        ))}
      </article>
    </section>
  );
};

export default BlogPage;
