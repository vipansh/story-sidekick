import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import { generateBlogPost as generateBlogPostApi } from "../apis";

const useGenerateBlogPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const generateBlogPost = async (prompt: string) => {
    if (!prompt) {
      toast.error("Please enter a topic name.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await generateBlogPostApi(prompt);
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = response.data as { blogId?: string };
      console.log({ data });
      if (data?.blogId) {
        router.push(`/blog/${data.blogId}`);
      } else {
        toast.error("Failed to generate blog post. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while processing your request. Please try again."
      );
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { generateBlogPost, isLoading };
};

export default useGenerateBlogPost;
