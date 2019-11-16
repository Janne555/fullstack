import React, { useState } from 'react';
import './App.css';
import Authors from './Authors';
import Books from './Books'
import BookForm from './BookForm'

const App: React.FC = () => {
  const [mode, setMode] = useState<'authors' | 'books' | 'bookform'>('authors')

  return (
    <div>
      <div>
        <button onClick={() => setMode('authors')}>authors</button>
        <button onClick={() => setMode('books')}>books</button>
        <button onClick={() => setMode('bookform')}>add book</button>
      </div>
      {mode === 'authors' && <Authors />}
      {mode === 'books' && <Books />}
      {mode === 'bookform' && <BookForm />}
    </div>
  );
}

export default App;
