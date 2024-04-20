import { useState } from "react";
import { requestForQuestion as requestForQuestionApi } from "../apis";

interface HeadingStructure {
  headingsOption: string[];
}

const useQuestionRetrieval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const retrieveQuestions = async (
    prompt: string
  ): Promise<HeadingStructure> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await requestForQuestionApi(
        prompt,
      );

      if (response.status !== 200) {
        throw new Error("Failed to retrieve questions");
      }

      return response.data as HeadingStructure;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { retrieveQuestions, isLoading, error };
};

export default useQuestionRetrieval;
