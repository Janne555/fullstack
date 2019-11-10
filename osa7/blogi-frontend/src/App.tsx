import React, { useState } from 'react'
import Message from './components/Message'
import * as Types from './types'
import LoginForm from './components/LoginForm'
import { login } from './services/services'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useResource } from './hooks/useResource'
import { setNotification } from './reducers/notification'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'

export const UserContext = React.createContext<string>('')

const App: React.FC = () => {
  const [user, setUser] = useState<Types.User | null>(null)
  const [blogs, blogService] = useResource<Types.Blog, Types.NewBlog>('/api/blog')
  const dispatch = useAppDispatch()
  const { message } = useAppSelector<Types.State.Notification>(state => state.notification)

  async function handleLogin(credentials: Types.Credentials): Promise<void> {
    try {
      const user = await login(credentials)
      setUser(user)

      dispatch(setNotification(`Logged in as ${user.username}`))
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('userName', user.username)
    } catch (error) {
      if (error.message.includes('401')) {
        dispatch(setNotification('wrong username or password', true))
      } else {
        dispatch(setNotification(error.message, true))
      }
      console.error(error)
    }
  }

  async function handleNewBlog(newblog: Types.NewBlog): Promise<void> {
    if (!user)
      return
    try {
      await blogService.create(newblog)
      dispatch(setNotification(`a new blog ${newblog.title} by ${newblog.author} added`))
    } catch (error) {
      console.error()
      dispatch(setNotification(error.message, true))
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
      dispatch(setNotification(`liked blog "${blog.title}"`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.message, true))
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
      dispatch(setNotification(`removed blog "${blog.title}"`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification(error.message, true))
    }
  }


  return (
    <UserContext.Provider value={user ? user.username : ''} >
      <div>
        {message && <Message />}
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
