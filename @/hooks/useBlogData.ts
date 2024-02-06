import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getBlogById } from "../lib/supabase";

type BlogDataType = {
      content: {
            title: string;
            content: Array<{ data: string[] }>;
      };
      imageUrl: string;
};

const useBlogData = (): BlogDataType | null => {
      const [blogData, setBlogData] = useState<BlogDataType | null>(null);
      const param = useParams<{ id: string }>();
      const id = param?.id || "2";

      useEffect(() => {
            const fetchBlogData = async () => {
                  const { data } = await getBlogById(Number(id));
                  setBlogData({
                        content: JSON.parse(data?.content || `{}`),
                        imageUrl: data?.imageUrl,
                  });
            };

            fetchBlogData();
      }, [id]);

      return blogData;
};

export default useBlogData;
