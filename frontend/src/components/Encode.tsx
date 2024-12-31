import React, { useState } from 'react';
import { PublicKey } from '../types';
import { useBackendCalculation } from '../hooks/useBackendCalculation';

const Encode: React.FC<PublicKey> = ({ n, e }) => {
  const [plaintext, setPlaintext] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await requestCalculation({ type: 'encode', n: n, e: e, plaintext: plaintext });
    setSubmitted(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaintext(event.target.value);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step-outer'>
      <div className='step-inner'>
        <h4>
          Step 2:
          <br />
          Encode Message
        </h4>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor='plaintext-input'>Enter your secret message:</label>
            <br />
            <input
              type='text'
              id='plaintext-input'
              value={plaintext}
              onChange={handleInputChange}
              placeholder='plaintext goes here'
            />
            <button type='submit'>Encode</button>
          </form>
        ) : (
          data &&
          data.type === 'encode' &&
          data.result && (
            <div>
              <p>Ciphertext:</p>
              <p>{data.result.ciphertext.join(', ')}</p>
              <p>
                <em>This is what you send to the recipient!</em>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Encode;
