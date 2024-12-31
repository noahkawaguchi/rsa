import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ReceiveMessage from './components/ReceiveMode/ReceiveMessage';
import WriteMessage from './components/WriteMode/WriteMessage';
import ReadMessage from './components/ReadMode/ReadMessage';

type Mode = 'welcome' | 'receive' | 'write' | 'read';

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
          <div className='main-menu'>
            <button id='receive-button' onClick={() => handleButtonClick('receive')}>
              Receive Message
            </button>
            <label htmlFor='receive-button'>
              — generate public and private keys so you can receive messages
            </label>
            <br />
            <hr />
            <button id='write-button' onClick={() => handleButtonClick('write')}>
              Write Message
            </button>
            <label htmlFor='write-button'>
              — use someone else's public key to write them a message
            </label>
            <br />
            <hr />
            <button id='read-button' onClick={() => handleButtonClick('read')}>
              Read Message
            </button>
            <label htmlFor='read-button'>
              {' '}
              — use your private key to read a message someone wrote for you
            </label>
            <br />
            <hr />
          </div>
        )}
        <div>
          {mode === 'receive' && <ReceiveMessage />}
          {mode === 'write' && <WriteMessage />}
          {mode === 'read' && <ReadMessage />}
          {mode !== 'welcome' && (
            <button onClick={() => handleButtonClick('welcome')}>Home</button>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
