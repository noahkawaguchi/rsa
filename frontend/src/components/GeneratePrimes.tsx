import React from 'react';
import { useState } from 'react';
import { useBackendCalculation } from '../hooks/useBackendCalculation';

interface GeneratePrimesProps {
  setPrimes(p: number, q: number): void;
}

const GeneratePrimes: React.FC<GeneratePrimesProps> = ({ setPrimes }) => {
  const [hasChosen, setHasChosen] = useState(false);
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  const unicodeChoice = async (userChoseUnicode: boolean) => {
    await requestCalculation(Number(userChoseUnicode), 'primes', (data) => {
      setPrimes(data[0], data[1]);
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
          <p>My secret message will contain...</p>
          <button onClick={() => unicodeChoice(false)}>ASCII only</button>
          <button onClick={() => unicodeChoice(true)}>Unicode symbols</button>
          <p>(If you're not sure, choose Unicode)</p>
        </div>
      ) : (
        data && (
          <p>
            Your primes p and q are {data[0]} and {data[1]}
          </p>
        )
      )}
    </div>
  );
};

export default GeneratePrimes;
