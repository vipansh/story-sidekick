import { useState } from "react";
import { requestForOptionChange as requestForOptionChangeApi } from "../apis";



const useRequestForOptionChange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestForOptionChange = async (prompt: string, option: string, newOption?: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestForOptionChangeApi({
        prompt,
        option,
        newOption
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      return response.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, requestForOptionChange };
};

export default useRequestForOptionChange;
