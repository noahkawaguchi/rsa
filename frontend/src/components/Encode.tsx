import React, { useState } from 'react';
import { Keys } from '../types';

const Encode: React.FC<Keys> = ({ n, e, d }) => {
  const [plaintext, setPlaintext] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaintext(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submitted value: ${plaintext}`);
  };

  return (
    <div className='step'>
      <h4>
        Step 3:
        <br />
        Encode Message
      </h4>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='input'>Enter your secret message:</label>
          <input
            type='text'
            id='input'
            value={plaintext}
            onChange={handleInputChange}
            placeholder='plaintext here...'
          />
          <button type='submit'>Submit</button>
        </form>
        <p>
          n = {n} | e = {e} | d = {d}
        </p>
      </div>
    </div>
  );
};

export default Encode;
