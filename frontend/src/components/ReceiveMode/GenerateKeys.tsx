import React, { useState, useEffect } from 'react';
import { useBackendCalculation } from '../../hooks/useBackendCalculation';
import { KeysRequest, KeysResponse, Primes } from '../../types';

/**
 * Retrieves and displays the public key (n, e) and private key
 * (n, d) based on previously generated primes p and q.
 * @param p - The first prime.
 * @param q - The second prime.
 * @returns An interface that explains public and private keys and then
 *          displays them once the user clicks the generate button.
 */
const GenerateKeys: React.FC<Primes> = ({ p, q }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const { data, error, loading, requestCalculation } = useBackendCalculation<
    KeysRequest,
    KeysResponse
  >();

  useEffect(() => {
    requestCalculation({ type: 'keys', p: p, q: q });
  }, [p, q, requestCalculation]);

  const handleButtonClick = () => setButtonClicked(true);

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Generate Keys
      </h4>
      {data &&
        data.result &&
        (!buttonClicked ? (
          <div>
            <p>
              Your <span className='bold-gold'>public key</span> (n, e) will be for other people to
              use to encode messages to you. Your <span className='bold-gold'>private key</span>{' '}
              (n, d) will be for you to use to decode messages encoded using your public key. This
              way, you can openly broadcast your public key while keeping your private key secret,
              and people will be able to write you messages without being able to read your
              messages.
            </p>
            <button onClick={handleButtonClick}>Generate keys from primes</button>
          </div>
        ) : (
          <div>
            <p>
              Your public key (n, e) is (<span className='bold-gold'>{data.result.n}</span>,{' '}
              <span className='bold-gold'>{data.result.e}</span>).
              <br />
              Your private key (n, d) is (<span className='bold-gold'>{data.result.n}</span>,{' '}
              <span className='bold-gold'>{data.result.d}</span>).
              <br />
            </p>
            <p>
              <em>Keep these somewhere safe!</em>
            </p>
          </div>
        ))}
    </div>
  );
};

export default GenerateKeys;
