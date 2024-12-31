import React, { useState } from 'react';
import { PublicKey } from '../types';

interface EnterPublicKeyProps {
  updatePublicKey(key: PublicKey): void;
}

const EnterPublicKey: React.FC<EnterPublicKeyProps> = ({ updatePublicKey }) => {
  const [submitted, setSubmitted] = useState(false);
  const [nInput, setNInput] = useState(0);
  const [eInput, setEInput] = useState(0);

  const handleNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? 0 : parseInt(event.target.value);
    setNInput(value);
  };

  const handleEChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? 0 : parseInt(event.target.value);
    setEInput(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePublicKey({ n: nInput, e: eInput });
    setSubmitted(true);
  };

  return (
    <div className='step-outer'>
      <div className='step-inner'>
        <h4>
          Step 1:
          <br />
          Enter Public Key
        </h4>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p>Enter the recipient's public key (n, e):</p>
            <label htmlFor='public-n-input'>n: </label>
            <input
              id='public-n-input'
              type='number'
              min={1}
              placeholder='enter n...'
              inputMode='numeric'
              onChange={handleNChange}
            />
            <br />
            <label htmlFor='public-e-input'>e: </label>
            <input
              id='public-e-input'
              type='number'
              min={1}
              placeholder='enter e...'
              inputMode='numeric'
              onChange={handleEChange}
            />
            <br />
            <button type='submit'>Submit</button>
          </form>
        ) : (
          <>
            <p>n: {nInput}</p>
            <p>e: {eInput}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EnterPublicKey;
