import axios from 'axios';
import { renderHook, act } from '@testing-library/react';
import { useBackendCalculation } from './useBackendCalculation';
import {
  KeysRequest,
  EncodeRequest,
  DecodeRequest,
  KeysResponse,
  EncodeResponse,
  DecodeResponse,
} from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useBackendCalculation', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());

  it('should set initial return values properly', () => {
    const { result } = renderHook(() => useBackendCalculation());
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.requestCalculation).toBe('function');
  });

  it('should handle a successful response', async () => {
    // Set up
    const expectedResult: DecodeResponse = {
      type: 'decode',
      result: { plaintext: 'successful call' },
    };
    mockedAxios.post.mockResolvedValueOnce({ data: expectedResult });
    const { result } = renderHook(() => useBackendCalculation());

    // Make call
    const decodeRequest: DecodeRequest = { n: 1, d: 2, type: 'decode', ciphertext: [3, 4, 5] };
    await act(async () => result.current.requestCalculation(decodeRequest));

    // Check values
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(expectedResult);
    expect(result.current.error).toBeNull();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/calculate',
      decodeRequest
    );
  });

  it('should call the callback when one is provided', async () => {
    // Set up
    const encodeResponse: EncodeResponse = { type: 'encode', result: { ciphertext: [6, 7, 8] } };
    mockedAxios.post.mockResolvedValueOnce({ data: encodeResponse });
    const { result } = renderHook(() => useBackendCalculation());
    const callback = jest.fn();
    const encodeRequest: EncodeRequest = {
      n: 3,
      e: 4,
      type: 'encode',
      plaintext: 'the callback should be called',
    };

    // Make request and check values
    await act(async () => result.current.requestCalculation(encodeRequest, callback));
    expect(callback).toHaveBeenCalledWith(encodeResponse);
  });

  it('should handle an error from the server', async () => {
    const keysResponse: KeysResponse = { type: 'keys', error: 'Error message from the server' };
    mockedAxios.post.mockRejectedValueOnce({ response: { data: keysResponse } });
    const { result } = renderHook(() => useBackendCalculation());
    const keysRequest: KeysRequest = { type: 'keys', p: 11, q: 13 };
    await act(async () => result.current.requestCalculation(keysRequest));
    expect(result.current.error?.message).toBe('Error message from the server');
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle a no response scenario', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      request: {},
      message: 'No response from server',
    });
    const { result } = renderHook(() => useBackendCalculation());
    await act(async () => {
      result.current.requestCalculation({ type: 'primes', choice: 'unicode' });
    });
    expect(result.current.error?.message).toBe('No response received: No response from server');
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle a request setup error', async () => {
    mockedAxios.post.mockRejectedValueOnce({ message: 'request setup error' });
    const { result } = renderHook(() => useBackendCalculation());
    const decodeRequest: DecodeRequest = {
      n: 10,
      d: 20,
      type: 'decode',
      ciphertext: [30, 40, 50],
    };
    await act(async () => result.current.requestCalculation(decodeRequest));
    expect(result.current.error?.message).toBe('Request setup error: request setup error');
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
