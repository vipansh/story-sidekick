import React from "react";
import Link from "next/link";
import Back from "../svg/Back";

const BlogHeader = () => (
  <nav className="mb-6">
    <Link href="/" passHref>
      <div className="flex items-center space-x-3 text-blue-600 hover:text-blue-800">
        <Back />
        <span>Back to Home</span>
      </div>
    </Link>
  </nav>
);

export default BlogHeader;
