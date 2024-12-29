import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { RSAState } from './types';
import Header from './components/Header';
import GeneratePrimes from './components/GeneratePrimes';

const App: React.FC = (): React.JSX.Element => {
  const [appState, setAppState] = useState<RSAState>({
    p: 0,
    q: 0,
    n: 0,
    e: 0,
    d: 0,
    C: [0],
  });

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <GeneratePrimes appState={appState} setAppState={setAppState} />
      </main>
    </>
  );
};

export default App;
