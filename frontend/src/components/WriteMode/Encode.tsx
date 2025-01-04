import React, { useState } from 'react';
import { PublicKey } from '../../types';
import { useBackendCalculation } from '../../hooks/useBackendCalculation';

/**
 * Collects the plaintext from the user and then retrieves and displays the ciphertext.
 * @param n - The first half of the recipient's public key.
 * @param e - The second half of the recipient's public key. 
 * @returns A controlled input for the user's message if they have not submitted 
 *          it yet, or a box displaying the ciphertext if they have.
 */
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
    <div className='step'>
      <h4>
        Step 2:
        <br />
        Encode Message
      </h4>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor='plaintext-input'>
            Enter your <span className='bold-gold'>secret message</span>:
          </label>
          <br />
          <input
            type='text'
            id='plaintext-input'
            value={plaintext}
            onChange={handleInputChange}
            placeholder='plaintext goes here'
            required
          />
          <button type='submit'>Encode</button>
        </form>
      ) : (
        data &&
        data.type === 'encode' &&
        data.result && (
          <div>
            <p>Ciphertext:</p>
            <p className='message-text'>{data.result.ciphertext.join(', ')}</p>
            <p>
              <em>This is what you send to the recipient!</em>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Encode;
