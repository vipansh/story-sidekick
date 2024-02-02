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
    content: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const { data } = await getBlogById(Number(id));
      setBlogData(data);
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
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Back />
            <p>Back</p>
          </div>
        </Link>
      </nav>{" "}
      <Image
        alt=""
        src={blogData?.imageUrl}
        width={800}
        height={300}
        layout="responsive"
      />
      <article className="prose">
        <Markdown>{blogData?.content}</Markdown>
      </article>
    </section>
  );
};

export default BlogPage;
