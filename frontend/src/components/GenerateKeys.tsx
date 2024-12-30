import React from 'react';

interface GenerateKeysProps {
  p: number;
  q: number;
}

const GenerateKeys: React.FC<GenerateKeysProps> = ({ p, q }) => {
  return (
    <div>
      <p>
        p: {p}, q: {q}
      </p>
    </div>
  );
};

export default GenerateKeys;
