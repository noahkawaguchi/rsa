import React, { useState } from 'react';
import { PrivateKey } from '../../types';

interface EnterPrivateKeyProps {
  updatePrivateKey(key: PrivateKey): void;
}

const EnterPrivateKey: React.FC<EnterPrivateKeyProps> = ({ updatePrivateKey }) => {
  const [submitted, setSubmitted] = useState(false);
  const [nInput, setNInput] = useState(0);
  const [dInput, setDInput] = useState(0);

  const handleNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? 0 : parseInt(event.target.value);
    setNInput(value);
  };

  const handleDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? 0 : parseInt(event.target.value);
    setDInput(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePrivateKey({ n: nInput, d: dInput });
    setSubmitted(true);
  };

  return (
    <div className='step'>
      <h4>
        Step 1:
        <br />
        Enter Private Key
      </h4>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p>
            Enter <span className='bold-gold'>your private key</span> (n, d):
          </p>
          <label htmlFor='private-n-input'>n: </label>
          <input
            id='private-n-input'
            type='number'
            min={1}
            placeholder='enter n...'
            inputMode='numeric'
            onChange={handleNChange}
            required
          />
          <br />
          <label htmlFor='private-d-input'>d: </label>
          <input
            id='private-d-input'
            type='number'
            min={1}
            placeholder='enter d...'
            inputMode='numeric'
            onChange={handleDChange}
            required
          />
          <br />
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <>
          <p>n: {nInput}</p>
          <p>d: {dInput}</p>
        </>
      )}
    </div>
  );
};

export default EnterPrivateKey;
