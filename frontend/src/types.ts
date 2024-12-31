export interface Primes {
  p: number;
  q: number;
}

export interface Keys {
  n: number;
  e: number;
  d: number;
}

export type PublicKey = Omit<Keys, 'd'>;
export type PrivateKey = Omit<Keys, 'e'>;

export interface PrimesRequest {
  type: 'primes';
  choice: 'ascii' | 'unicode';
}

export interface KeysRequest extends Primes {
  type: 'keys';
}

export interface PrimesResponse {
  type: 'primes';
  result?: Primes;
  error?: string;
}

export interface KeysResponse {
  type: 'keys';
  result?: Keys;
  error?: string;
}

export type CalculationRequest = PrimesRequest | KeysRequest;
export type CalculationResponse = PrimesResponse | KeysResponse;
