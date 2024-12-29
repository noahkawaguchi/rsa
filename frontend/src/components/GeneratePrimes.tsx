import React from 'react';
import { useEffect, useState } from 'react';
import { RSAState } from '../types';
import { useBackendCalculation } from '../hooks/useBackendCalculation';

interface GeneratePrimesProps {
  appState: RSAState;
  setAppState(value: React.SetStateAction<RSAState>): void;
}

const GeneratePrimes: React.FC<GeneratePrimesProps> = ({
  appState,
  setAppState,
}): React.JSX.Element => {
  const { data, error } = useBackendCalculation(8, 'double');

  if (appState.p === 0 || appState.q === 0) {
    return (
      <>
        <h4>Step 1: Generate Primes</h4>
      </>
    );
  }
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>;
  return <p>Result: {data[0]}</p>;
};

export default GeneratePrimes;
