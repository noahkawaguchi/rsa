export interface Primes {
  p: number;
  q: number;
}

export interface PrimesRequest {
  type: 'primes';
  choice: 'ascii' | 'unicode';
}

export interface PrimesResponse {
  type: 'primes';
  result?: {
    p: number;
    q: number;
  };
  error?: string;
}

export interface KeysRequest {
  type: 'keys';
  p: number;
  q: number;
}

export interface KeysResponse {
  type: 'keys';
  result?: {
    n: number;
    e: number;
    d: number;
  };
  error?: string;
}

export type CalculationRequest = PrimesRequest | KeysRequest;

export type CalculationResponse = PrimesResponse | KeysResponse;
