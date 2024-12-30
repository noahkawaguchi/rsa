import React from 'react';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import WriteMessage from './components/WriteMessage';

type Mode = 'welcome' | 'write' | 'read';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('welcome');

  const handleButtonClick = (mode: Mode) => setMode(mode);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {mode === 'welcome' && (
          <>
            <button onClick={() => handleButtonClick('write')}>Write Message</button>
            <button onClick={() => handleButtonClick('read')}>Read Message</button>
          </>
        )}
        {mode === 'write' && <WriteMessage />}
        {mode === 'read' && <p>[read will go here]</p>}
        {mode !== 'welcome' && <button onClick={() => handleButtonClick('welcome')}>Home</button>}
      </main>
    </>
  );
};

export default App;
