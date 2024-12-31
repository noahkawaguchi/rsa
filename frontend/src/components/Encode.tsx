import React, { useState } from 'react';

const Encode: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaintext(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submitted value: ${plaintext}`);
  };

  return (
    <div className='step-outer'>
      <div className='step-inner'>
        <h4>
          Step 2:
          <br />
          Encode Message
        </h4>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input'>Enter your secret message:</label>
            <br />
            <input
              type='text'
              id='input'
              value={plaintext}
              onChange={handleInputChange}
              placeholder='plaintext goes here...'
            />
            <button type='submit'>Encode</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Encode;
