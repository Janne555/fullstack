import React, { useState, useEffect } from 'react';
import Message from './componenets/Message'
import * as Types from '../types'
import LoginForm from './componenets/LoginForm';
import { login, createBlog, getBlogs, putBlog, removeBlog } from './services/services';
import NewBlog from './componenets/NewBlog'
import Blog from './componenets/Blog';
import Togglable from './componenets/Togglable'

export const UserContext = React.createContext<string>("")

const App: React.FC = () => {
  const [user, setUser] = useState<Types.User | null>(null)
  const [message, setMessage] = useState<Types.Message | null>(null)
  const [blogs, setBlogs] = useState<Types.Blog[]>([])
  const [refreshBlogs, setRefreshBlogs] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (user) {
      getBlogs(user.token)
        .then(blogs => {
          if (!cancelled && refreshBlogs) {
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
            setRefreshBlogs(false)
          }
        })
        .catch(console.error)
    }
    return () => { cancelled = true }
  }, [user, refreshBlogs])

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
      if (error.message.includes("401")) {
        setMessage({ content: "wrong username or password", error: true })
        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ content: error.message, error: true })
        setTimeout(() => setMessage(null), 5000)
      }
      console.error(error)
    }
  }

  async function handleNewBlog(newblog: Types.NewBlog) {
    if (!user)
      return
    try {
      const result: Types.Blog = await createBlog(newblog, user.token)
      setBlogs(prev => prev.concat(result))
      setMessage({ content: `a new blog ${newblog.title} by ${newblog.author} added` })
      setTimeout(() => setMessage(null), 5000)
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

  async function handleLike(blog: Types.Blog) {
    if (!user)
      return
    blog.likes = blog.likes + 1

    try {
      await putBlog(blog, user.token)
      setRefreshBlogs(true)
      setMessage({ content: `liked blog "${blog.title}"` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  async function handleRemove(blog: Types.Blog) {
    if (!user)
      return

    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (!ok)
      return

    try {
      await removeBlog(blog, user.token)
      setRefreshBlogs(true)
      setMessage({ content: `removed blog "${blog.title}"` })
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      console.error(error)
      setMessage({ content: error.message, error: true })
      setTimeout(() => setMessage(null), 5000)
    }
  }


  return (
    <UserContext.Provider value={user ? user.username : ""} >
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
  );
}

export default App;
