import { useState, useCallback } from 'react';
import axios from 'axios';
import { CalculationRequest, CalculationResponse } from '../types';
import { getApiUrl } from '../config';

/**
 * Custom hook that handles API requests.
 * @returns
 *    - Response status, data, and request function:
 *        `{ data, error, loading, requestCalculation }`.
 *    - See `requestCalculation`'s docstring for more.
 */
export const useBackendCalculation = () => {
  const [data, setData] = useState<CalculationResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Triggers a POST request. Response information will be in `data`, `error`, and `loading`, 
   * which are returned from the `useBackendCalculation` hook along with this function. 
   * Wrapped in `useCallback` to avoid unnecessary redefinitions and infinite loops.
   * 
   * @param request - One of the valid `CalculationRequest` types to be sent to the API.
   * @param callback - Optional callback function. Use this for setter functions 
   *                   that rely on the API request being complete.
   */
  const requestCalculation = useCallback(
    async (request: CalculationRequest, callback?: (data: CalculationResponse) => void) => {
      setLoading(true);
      axios
        .post<CalculationResponse>(`${getApiUrl()}/calculate`, request)
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
