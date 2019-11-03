import React, { useState, useEffect } from 'react';
import Message from './componenets/Message'
import * as Types from '../types'
import LoginForm from './componenets/LoginForm';
import { login, createBlog, getBlogs } from './services/services';
import NewBlog from './componenets/NewBlog'
import Blog from './componenets/Blog';

const App: React.FC = () => {
  const [user, setUser] = useState<Types.User | null>(null)
  const [message, setMessage] = useState<Types.Message | null>(null)
  const [blogs, setBlogs] = useState<Types.Blog[]>([])

  useEffect(() => {
    let cancelled = false
    if (user) {
      getBlogs(user.token)
        .then(blogs => {
          if (!cancelled)
            setBlogs(blogs)
        })
        .catch(console.error)
    }
    return () => { cancelled = true }
  }, [user])

  useEffect(() => {
    let cancelled = false
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('userName')
    if (token && username)
      !cancelled && setUser({ username, token })
    return () => { cancelled = true }
  }, [])

  async function handleLogin(credentials: Types.Credentials) {
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

  async function handleNewBlog(newblog: Types.NewBlog) {
    if (!user)
      return
    try {
      const result: Types.Blog = await createBlog(newblog, user.token)
      setBlogs(prev => prev.concat(result))
    } catch (error) {
      console.error()
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
      {!user
        ? <LoginForm onSubmit={handleLogin} />
        : <div>
          <h1>blogs</h1>
          <h2>blogs for {user.username} <button onClick={handleLogout}>logout</button></h2>
          <NewBlog onSubmit={handleNewBlog} />
          {
            blogs.map(blog => <Blog key={blog.id} blog={blog} />)
          }
        </div>
      }
    </div>
  );
}

export default App;
