import React, { ReactNode } from "react";
import { Card } from "./ui/card";

type BlogCardProps = {
  children: ReactNode;
};

const BlogCard: React.FC<BlogCardProps> = ({ children }) => (
  <Card className="my-4 pb-16 mx-auto max-w-2xl lg:max-w-4xl p-6 md:p-8 py-12 bg-white shadow-lg rounded-lg">
    {children}
  </Card>
);

export default BlogCard;
