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

export interface EncodeRequest extends PublicKey {
  type: 'encode';
  plaintext: string;
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

export interface EncodeResponse {
  type: 'encode';
  result?: { ciphertext: Array<number> };
  error?: string;
}

export type CalculationRequest = PrimesRequest | KeysRequest | EncodeRequest;
export type CalculationResponse = PrimesResponse | KeysResponse | EncodeResponse;
