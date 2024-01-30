
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import Back from "../../@/svg/Back";
import { getBlogById } from "../../@/lib/supabase";

type Props = {
  params: {
    id: string;
  };
};

export const runtime = "edge";

const BlogPage = async ({ params: { id } }: Props) => {
  const {
    data: { content, imagePath },
  } = await getBlogById(Number(id));
  console.log({ content, imagePath });

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
        src={imagePath}
        width={800}
        height={300}
        layout="responsive"
      />
      <article className="prose">
        <Markdown>{content}</Markdown>
      </article>
    </section>
  );
};

export default BlogPage;
