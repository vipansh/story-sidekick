import React, { ReactNode } from "react";
import { Card } from "./ui/card";

type BlogCardProps = {
  children: ReactNode;
};

const BlogCard: React.FC<BlogCardProps> = ({ children }) => (
  <Card className="max-w-2xl mx-auto antialiased pt-4 relative my-4 pb-16  lg:max-w-4xl p-6 md:p-8 py-12 bg-white shadow-lg rounded-lg">
    {children}
  </Card>
);

export default BlogCard;
