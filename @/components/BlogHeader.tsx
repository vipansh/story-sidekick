import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Back from "../svg/Back";

const BlogHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <nav className="mb-6">
      <div
        className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 cursor-pointer"
        onClick={handleBack}
      >
        <Back />
        <span>Back to Home</span>
      </div>
    </nav>
  );
};

export default BlogHeader;
