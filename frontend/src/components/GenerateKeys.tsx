import React, { useEffect } from 'react';
import { useBackendCalculation } from '../hooks/useBackendCalculation';

interface GenerateKeysProps {
  p: number;
  q: number;
}

const GenerateKeys: React.FC<GenerateKeysProps> = ({ p, q }) => {
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  useEffect(() => {
    requestCalculation([p, q], 'keys');
  }, [p, q, requestCalculation]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Generate Keys
      </h4>
      {data && (
        <p>
          Your public key (n, e) is ({data[0]}, {data[1]}) <br />
          Your private key (n, d) is ({data[0]}, {data[2]})
        </p>
      )}
    </div>
  );
};

export default GenerateKeys;
