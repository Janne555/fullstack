import React, { useState, useEffect } from 'react';
import Message from './componenets/Message'
import { User as UserType, Credentials as CredentialsType, Message as MessageType } from '../types'
import LoginForm from './componenets/LoginForm';
import { login } from './services/services';
import Blogs from './componenets/Blogs';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const [message, setMessage] = useState<MessageType | null>(null)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('userName')
    if (token && username)
      setUser({ username, token })
  }, [])

  async function handleSubmit(credentials: CredentialsType) {
    try {
      const user = await login(credentials)
      setUser(user)

      setMessage({ content: `Logged in as ${user.username}` })
      setTimeout(() => setMessage(null), 5000)
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('userName', user.username)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  function handleLogout() {
    window.localStorage.setItem('token', "")
    window.localStorage.setItem('userName', "")
    setUser(null)
  }

  return (
    <div>
      {message && <Message message={message} />}
      {user
        ? <Blogs user={user} onLogout={handleLogout} />
        : <LoginForm onSubmit={handleSubmit} />
      }
    </div>
  );
}

export default App;
