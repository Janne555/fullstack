import React, { useState } from 'react';
import './App.css';
import Authors from './Authors';
import Books from './Books'
import BookForm from './BookForm'
import LoginForm from './LoginForm';

export const AuthContext = React.createContext<{ token: string | null, updateToken: (token: string | null) => void }>({ token: null, updateToken: () => { } })

const App: React.FC = () => {
  const [mode, setMode] = useState<'authors' | 'books' | 'bookform' | 'login'>('authors')
  const [token, setToken] = React.useState<string | null>(localStorage.getItem("token"))

  function updateToken(token: string | null): void {
    setToken(token)
    if (token)
      localStorage.setItem("token", token)
    else
      localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      <div>
        <div>
          <button onClick={() => setMode('authors')}>authors</button>
          <button onClick={() => setMode('books')}>books</button>
          {token && <button onClick={() => setMode('bookform')}>add book</button>}
          {token
            ? <button onClick={() => updateToken(null)}>logout</button>
            : <button onClick={() => setMode('login')}>login</button>
          }
        </div>
        {mode === 'authors' && <Authors />}
        {mode === 'books' && <Books />}
        {mode === 'bookform' && <BookForm />}
        {mode === 'login' && !token && <LoginForm />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
