import React from 'react';
import { useState } from 'react';
import { useBackendCalculation } from '../../hooks/useBackendCalculation';
import { Primes } from '../../types';

interface GeneratePrimesProps {
  updatePrimes(primes: Primes): void;
}

/**
 * Retrieves and displays a random pair of primes depending 
 * on the user's choice of ASCII or Unicode.
 * @param updatePrimes - A function to inform the parent of the retrieved primes.
 * @returns An interface asking for the user's choice of ASCII or Unicode if they
 *          have not chosen yet, or text displaying the two primes if they have.
 */
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
    <div className='step'>
      <h4>
        Step 1:
        <br />
        Generate Primes
      </h4>
      {!hasChosen ? (
        <div>
          <p>
            I want to <span className='bold-gold'>receive</span> secret messages containing...
          </p>
          <button onClick={() => unicodeChoice('ascii')}>ASCII only</button>
          <button onClick={() => unicodeChoice('unicode')}>Unicode symbols</button>
          <p>(If you're unsure, choose <span className='bold-gold'>Unicode</span>.)</p>
        </div>
      ) : (
        data &&
        data.type === 'primes' &&
        data.result && (
          <p>
            Your primes p and q are <span className='bold-gold'>{data.result.p}</span> and{' '}
            <span className='bold-gold'>{data.result.q}</span>.
          </p>
        )
      )}
    </div>
  );
};

export default GeneratePrimes;
