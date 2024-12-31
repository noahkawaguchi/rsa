import React, { useState, useCallback } from 'react';
import GeneratePrimes from './GeneratePrimes';
import GenerateKeys from './GenerateKeys';
import Encode from './Encode';
import { Primes, Keys } from '../types';

const WriteMessage: React.FC = () => {
  const [primes, setPrimes] = useState<Primes>({ p: 0, q: 0 });
  const [keys, setKeys] = useState<Keys>({ n: 0, e: 0, d: 0 });

  const updatePrimes = (primes: Primes) => {
    setPrimes({
      p: primes.p,
      q: primes.q,
    });
  };

  const updateKeys = useCallback((keys: Keys) => {
    setKeys({
      n: keys.n,
      e: keys.e,
      d: keys.d,
    });
  }, []);

  return (
    <>
      <GeneratePrimes updatePrimes={updatePrimes} />
      <hr />
      {primes.p !== 0 && (
        <>
          <GenerateKeys p={primes.p} q={primes.q} updateKeys={updateKeys} />
          <hr />
        </>
      )}
      {keys.n !== 0 && <Encode n={keys.n} e={keys.e} d={keys.d} />}
    </>
  );
};

export default WriteMessage;
