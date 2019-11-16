import React, { useState } from 'react';
import './App.css';
import Authors from './Authors';

const App: React.FC = () => {
  const [mode, setMode] = useState<'authors' | 'books'>('authors')

  return (
    <div>
      <div>
        <button onClick={() => setMode('authors')}>authors</button>
        <button onClick={() => setMode('books')}>books</button>
      </div>
      {mode === 'authors' && <Authors />}
    </div>
  );
}

export default App;
