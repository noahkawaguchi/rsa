import React, { useState } from 'react';
import GeneratePrimes from './GeneratePrimes';
import GenerateKeys from './GenerateKeys';

interface PrimesState {
  p: number;
  q: number;
}

const WriteMessage: React.FC = () => {
  const [primes, setPrimes] = useState<PrimesState>({ p: 0, q: 0 });

  const updatePrimes = (p: number, q: number) => {
    setPrimes({
      p: p,
      q: q,
    });
  };

  return (
    <>
      <GeneratePrimes updatePrimes={updatePrimes} />
      <hr />
      {primes.p !== 0 && primes.q !== 0 && (
        <>
          <GenerateKeys p={primes.p} q={primes.q} />
          <hr />
        </>
      )}
    </>
  );
};

export default WriteMessage;
