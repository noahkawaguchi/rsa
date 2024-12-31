import React, { useState } from 'react';
import { PrivateKey } from '../../types';
import EnterPrivateKey from './EnterPrivateKey';
import Decode from './Decode';

const ReadMessage: React.FC = () => {
  const [privateKey, setPrivateKey] = useState<PrivateKey>({ n: 0, d: 0 });

  const updatePrivateKey = (key: PrivateKey) => {
    setPrivateKey({
      n: key.n,
      d: key.d,
    });
  };

  return (
    <>
      <EnterPrivateKey updatePrivateKey={updatePrivateKey} />
      <hr />
      {privateKey.n !== 0 && privateKey.d !== 0 && (
        <>
          <Decode n={privateKey.n} d={privateKey.d} />
          <hr />
        </>
      )}
    </>
  );
};

export default ReadMessage;
