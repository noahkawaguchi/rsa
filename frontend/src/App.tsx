import React from 'react';
import { useState } from 'react';
import './App.css';
import { RSAState } from './types';
import Header from './components/Header';
import GeneratePrimes from './components/GeneratePrimes';
import MyComponent from './components/MyComponent';

const App: React.FC = () => {
  const [appState, setAppState] = useState<RSAState>({
    p: 0,
    q: 0,
    n: 0,
    e: 0,
    d: 0,
    C: [0],
  });

  const setPrimes = (p: number, q: number) => {
    setAppState((prevState) => ({
      ...prevState,
      p: p,
      q: q,
    }));
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <GeneratePrimes setPrimes={setPrimes} />
        <hr />
        {appState.p !== 0 && appState.q !== 0 && <MyComponent p={appState.p} q={appState.q} />}
      </main>
    </>
  );
};

export default App;
