import React, { useState } from 'react';
import './App.css';
import Authors from './Authors';
import Books from './Books'

const App: React.FC = () => {
  const [mode, setMode] = useState<'authors' | 'books'>('authors')

  return (
    <div>
      <div>
        <button onClick={() => setMode('authors')}>authors</button>
        <button onClick={() => setMode('books')}>books</button>
      </div>
      {mode === 'authors' && <Authors />}
      {mode === 'books' && <Books />}
    </div>
  );
}

export default App;
