/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

type BlogImageProps = {
  imageUrl: string;
  title: string;
  ratio?: number;
};

const BlogImage: React.FC<BlogImageProps> = ({ imageUrl, title, ratio }) => (
  <AspectRatio ratio={ratio || 16 / 9}>
    <img
      alt={title || "Blog Image"}
      src={imageUrl}
      className="rounded-md object-cover w-full h-full"
    />
  </AspectRatio>
);

export default BlogImage;
