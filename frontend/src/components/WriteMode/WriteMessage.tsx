import React, { useState } from 'react';
import { PublicKey } from '../../types';
import EnterPublicKey from './EnterPublicKey';
import Encode from './Encode';

const WriteMessage: React.FC = () => {
  const [publicKey, setPublicKey] = useState<PublicKey>({ n: 0, e: 0 });

  const updatePublicKey = (key: PublicKey) => {
    setPublicKey({
      n: key.n,
      e: key.e,
    });
  };

  return (
    <>
      <EnterPublicKey updatePublicKey={updatePublicKey} />
      <hr />
      {publicKey.n !== 0 && publicKey.e !== 0 && (
        <>
          <Encode n={publicKey.n} e={publicKey.e} />
          <hr />
        </>
      )}
    </>
  );
};

export default WriteMessage;
