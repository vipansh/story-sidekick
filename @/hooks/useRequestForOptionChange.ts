import { useState } from 'react';
import axios from 'axios';

const useRequestForOptionChange = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const requestForOptionChange = async (prompt: string, option: string) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await axios.post('/api/request-for-option-change', { prompt, option });
                  if (response.status !== 200) {
                        throw new Error('Failed to fetch');
                  }
                  return response.data;
            } catch (error) {
                  setError(error);
            } finally {
                  setLoading(false);
            }
      };

      return { loading, error, requestForOptionChange };
};

export default useRequestForOptionChange;
