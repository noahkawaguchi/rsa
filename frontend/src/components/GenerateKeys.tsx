import React, { useEffect } from 'react';
import { useBackendCalculation } from '../hooks/useBackendCalculation';
import { Primes, Keys } from '../types';

interface GenerateKeysProps extends Primes {
  updateKeys(keys: Keys): void;
}

const GenerateKeys: React.FC<GenerateKeysProps> = ({ p, q, updateKeys }) => {
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  useEffect(() => {
    requestCalculation({ type: 'keys', p: p, q: q }, (data) => {
      if (data.type === 'keys' && data.result) {
        updateKeys({ n: data?.result.n, e: data?.result.e, d: data?.result.d });
      }
    });
  }, [p, q, updateKeys, requestCalculation]);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Generate Keys
      </h4>
      {data && data.type === 'keys' && data.result && (
        <p>
          Your public key (n, e) is ({data.result.n}, {data.result.e}) <br />
          Your private key (n, d) is ({data.result.n}, {data.result.d})
        </p>
      )}
    </div>
  );
};

export default GenerateKeys;
