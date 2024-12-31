import React from 'react';
import { useState } from 'react';
import { useBackendCalculation } from '../hooks/useBackendCalculation';
import { Primes } from '../types';

interface GeneratePrimesProps {
  updatePrimes(primes: Primes): void;
}

const GeneratePrimes: React.FC<GeneratePrimesProps> = ({ updatePrimes }) => {
  const [hasChosen, setHasChosen] = useState(false);
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  const unicodeChoice = async (choice: 'ascii' | 'unicode') => {
    await requestCalculation({ type: 'primes', choice: choice }, (data) => {
      if (data.type === 'primes' && data.result) {
        updatePrimes({ p: data.result.p, q: data.result.q });
      }
    });
    setHasChosen(true);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step-outer'>
      <div className='step-inner'>
        <h4>
          Step 1:
          <br />
          Generate Primes
        </h4>
        {!hasChosen ? (
          <div>
            <p>I want to receive secret messages containing...</p>
            <button onClick={() => unicodeChoice('ascii')}>ASCII only</button>
            <button onClick={() => unicodeChoice('unicode')}>Unicode symbols</button>
            <p>(If you're unsure, choose Unicode)</p>
          </div>
        ) : (
          data &&
          data.type === 'primes' &&
          data.result && (
            <p>
              Your primes p and q are {data.result.p} and {data.result.q}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default GeneratePrimes;
