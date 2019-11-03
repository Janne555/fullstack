import React, { useState } from 'react';
import Message from './componenets/Message'
import { User as UserType, Credentials as CredentialsType, Message as MessageType } from '../types'
import LoginForm from './componenets/LoginForm';
import { login } from './services/services';
import Blogs from './componenets/Blogs';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const [message, setMessage] = useState<MessageType | null>(null)

  async function handleSubmit(credentials: CredentialsType) {
    try {
      const user = await login(credentials)
      setUser(user)
      setMessage({ content: `Logged in as ${user.username}` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div>
      {message && <Message message={message} />}
      {user
        ? <Blogs user={user} />
        : <LoginForm onSubmit={handleSubmit} />
      }
    </div>
  );
}

export default App;
