import Link from "next/link";
import React from "react";

import ArrowLeftIcon from "../svg/ArrowLeftIcon";

const BlogHeader = () => {
  return (
    <nav className="mb-6">
      <Link
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 absolute top-4 left-4"
        href="/"
      >
        <ArrowLeftIcon />
        <span>Back to Home</span>
      </Link>
    </nav>
  );
};

export default BlogHeader;
