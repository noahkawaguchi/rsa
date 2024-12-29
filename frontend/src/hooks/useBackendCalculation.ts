import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/numbers';

interface RSAResponse {
  result?: Array<number>;
  error?: string;
}

export const useBackendCalculation = (input: number, type: string) => {
  const [data, setData] = useState<Array<number> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const requestCalculation = async () => {
      await axios
        .post<RSAResponse>(API_URL, { input: input, type: type })
        .then((response) => {
          if (response.data.result) setData(response.data.result);
        })
        .catch((error) => {
          if (error.response) {
            setError(new Error(error.response.data.error));
          } else if (error.request) {
            setError(new Error(`No response received: ${error.request}`));
          } else {
            setError(new Error(`Request setup error: ${error.message}`));
          }
        });
    };
    requestCalculation();
  }, [input, type]);

  return { data, error };
};
