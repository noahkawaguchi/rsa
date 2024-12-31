import React, { useState } from 'react';
import GeneratePrimes from './GeneratePrimes';
import GenerateKeys from './GenerateKeys';
import { Primes } from '../../types';

const ReceiveMessage: React.FC = () => {
  const [primes, setPrimes] = useState<Primes>({ p: 0, q: 0 });

  const updatePrimes = (primes: Primes) => {
    setPrimes({
      p: primes.p,
      q: primes.q,
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

export default ReceiveMessage;
