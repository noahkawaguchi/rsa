import React, { useState } from 'react';
import { PrivateKey } from '../../types';
import { useBackendCalculation } from '../../hooks/useBackendCalculation';

const Decode: React.FC<PrivateKey> = ({ n, d }) => {
  const [ciphertext, setCiphertext] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data, error, loading, requestCalculation } = useBackendCalculation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const elements = ciphertext.split(',').map((item) => item.trim());
    const isValid = elements.every((item) => !isNaN(Number(item)) && item !== '');
    if (!isValid) {
      alert('Invalid input. Please enter a comma-separated list of integers like the example.');
      return;
    }
    const parsedArray = elements.map(Number);
    await requestCalculation({ type: 'decode', n: n, d: d, ciphertext: parsedArray });
    setSubmitted(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCiphertext(event.target.value);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Decode Message
      </h4>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor='ciphertext-input'>
            Enter the <span className='bold-gold'>ciphertext</span> you received:
          </label>
          <br />
          <input
            type='text'
            id='ciphertext-input'
            value={ciphertext}
            onChange={handleInputChange}
            placeholder='ciphertext goes here'
          />
          <button type='submit'>Decode</button>
          <p>
            <i>(For example: 183965, 1578, 93928, 7832)</i>
          </p>
        </form>
      ) : (
        data &&
        data.type === 'decode' &&
        data.result && (
          <div>
            <p>
              <em>Here is the secret message!</em>
            </p>
            <p className='message-text'>{data.result.plaintext}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Decode;
