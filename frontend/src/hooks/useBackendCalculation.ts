import { useState, useCallback } from 'react';
import axios from 'axios';
import { CalculationRequest, CalculationResponse } from '../types';

const API_URL = 'http://127.0.0.1:5000/numbers';

export const useBackendCalculation = () => {
  const [data, setData] = useState<CalculationResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const requestCalculation = useCallback(
    async (request: CalculationRequest, callback?: (data: CalculationResponse) => void) => {
      setLoading(true);
      axios
        .post<CalculationResponse>(API_URL, request)
        .then((response) => {
          if (response.data) {
            setData(response.data);
            if (callback) callback(response.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            setError(new Error(error.response.data.error));
          } else if (error.request) {
            setError(new Error(`No response received: ${error.message}`));
          } else {
            setError(new Error(`Request setup error: ${error.message}`));
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { data, error, loading, requestCalculation };
};
