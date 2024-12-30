import React from 'react';

interface MyComponentProps {
  p: number;
  q: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ p, q }) => {
  return (
    <div>
      <p>p: {p}, q: {q}</p>
    </div>
  );
};

export default MyComponent;
