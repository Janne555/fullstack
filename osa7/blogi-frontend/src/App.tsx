import React, { useState } from 'react'
import Message from './components/Message'
import * as Types from '../types'
import LoginForm from './components/LoginForm'
import { login } from './services/services'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useResource } from './hooks/useResource'

export const UserContext = React.createContext<string>('')

const App: React.FC = () => {
  const [user, setUser] = useState<Types.User | null>(null)
  const [message, setMessage] = useState<Types.Message | null>(null)
  const [blogs, blogService] = useResource<Types.Blog, Types.NewBlog>('/api/blog')

  async function handleLogin(credentials: Types.Credentials): Promise<void> {
    try {
      const user = await login(credentials)
      setUser(user)

      setMessage({ content: `Logged in as ${user.username}` })
      setTimeout(() => setMessage(null), 5000)
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('userName', user.username)
    } catch (error) {
      if (error.message.includes('401')) {
        setMessage({ content: 'wrong username or password', error: true })
        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ content: error.message, error: true })
        setTimeout(() => setMessage(null), 5000)
      }
      console.error(error)
    }
  }

  async function handleNewBlog(newblog: Types.NewBlog): Promise<void> {
    if (!user)
      return
    try {
      await blogService.create(newblog)
      setMessage({ content: `a new blog ${newblog.title} by ${newblog.author} added` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error()
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  function handleLogout(): void {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('userName', '')
    setUser(null)
  }

  async function handleLike(blog: Types.Blog): Promise<void> {
    if (!user)
      return
    blog.likes = blog.likes + 1

    try {
      await blogService.update(blog)
      setMessage({ content: `liked blog "${blog.title}"` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  async function handleRemove(blog: Types.Blog): Promise<void> {
    if (!user)
      return

    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (!ok)
      return

    try {
      await blogService.remove(blog)
      setMessage({ content: `removed blog "${blog.title}"` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }


  return (
    <UserContext.Provider value={user ? user.username : ''} >
      <div>
        {message && <Message message={message} />}
        {!user
          ? <LoginForm onSubmit={handleLogin} />
          : <div>
            <h1>blogs</h1>
            <h2>blogs for {user.username} <button onClick={handleLogout}>logout</button></h2>
            <Togglable buttonLabel="new blog">
              <NewBlog onSubmit={handleNewBlog} />
            </Togglable>
            {
              blogs.map(blog => <Blog key={blog.id} blog={blog} onLike={handleLike} onRemove={handleRemove} />)
            }
          </div>
        }
      </div>
    </UserContext.Provider>
  )
}

export default App
