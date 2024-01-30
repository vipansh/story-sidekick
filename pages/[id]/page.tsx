import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import Back from "../../@/svg/Back";
import { getBlogById } from "../../@/lib/supabase";

type Props = {
  params: {
    id: string;
  };
};

const BlogPage = ({ params: { id } }: Props) => {
  const [blogData, setBlogData] = useState<{ content: string; imagePath: string } | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const {
        data: { content, imagePath },
      } = await getBlogById(Number(id));
      console.log({ content, imagePath });
      setBlogData({ content, imagePath });
    };

    fetchBlogData();
  }, [id]);

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
      <Image alt="" src={blogData.imagePath} width={800} height={300} layout="responsive" />
      <article className="prose">
        <Markdown>{blogData.content}</Markdown>
      </article>
    </section>
  );
};

export default BlogPage;
