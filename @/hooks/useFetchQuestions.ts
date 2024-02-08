
import { useState } from 'react';
import { toast } from 'sonner';

// Define the hook
const useFetchQuestions = () => {
      const [loading, setLoading] = useState(false);

      const fetchQuestions = async (prompt: string) => {
            if (!prompt) {
                  toast.error("Please enter a topic name.");
                  return;
            }
            setLoading(true);
            try {
                  const response = await fetch("/api/request_for_question", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ prompt }),
                  });
                  console.log({ response })
                  if (!response.ok) {
                        throw new Error("Failed to fetch");
                  }
                  const data = await response.json();
                  console.log({ data, test: "test" });
                  return data
            } catch (error) {
                  toast.error(
                        "An error occurred while processing your request. Please try again."
                  );
                  console.error("Error", error);
            } finally {
                  setLoading(false);
            }
      };

      return { fetchQuestions, loading };
};

export default useFetchQuestions;
