import React from 'react';
import { useBackendCalculation } from '../hooks/useBackendCalculation';

interface GenerateKeysProps {
  p: number;
  q: number;
}

const GenerateKeys: React.FC<GenerateKeysProps> = ({ p, q }) => {
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Generate Keys
      </h4>
      <p>
        p: {p}, q: {q}
      </p>
    </div>
  );
};

export default GenerateKeys;
