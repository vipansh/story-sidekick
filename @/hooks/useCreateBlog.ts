
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

// Define the hook
const useCreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const action = async (prompt: string) => {
    if (!prompt) {
      toast.error("Please enter a topic name.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json() as { blogId?: string };
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
      setLoading(false);
    }
  };

  return { action, loading };
};

export default useCreateBlog;
