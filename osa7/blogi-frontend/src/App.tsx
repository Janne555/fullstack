import React, { useEffect } from 'react'
import Message from './components/Message'
import * as Types from './types'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { initUser, login, logout } from './reducers/user'
import { createBlog, likeBlog, removeBlog } from './reducers/blogs'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { message } = useAppSelector<Types.State.Notification>(state => state.notification)
  const { username } = useAppSelector<Types.State.User>(state => state.user)
  const blogs = useAppSelector<Types.Blog[]>(state => state.blogs)

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  function handleLogin(credentials: Types.Credentials): void {
    dispatch(login(credentials))
  }

  async function handleNewBlog({ author, title, url }: Types.NewBlog): Promise<void> {
    dispatch(createBlog(title, author, url))
  }

  function handleLogout(): void {
    dispatch(logout())
  }

  async function handleLike(blog: Types.Blog): Promise<void> {
    dispatch(likeBlog(blog))
  }

  async function handleRemove(blog: Types.Blog): Promise<void> {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (!ok)
      return
    dispatch(removeBlog(blog))
  }


  return (
    <div>
      {message && <Message />}
      {!username
        ? <LoginForm onSubmit={handleLogin} />
        : <div>
          <h1>blogs</h1>
          <h2>blogs for {username} <button onClick={handleLogout}>logout</button></h2>
          <Togglable buttonLabel="new blog">
            <NewBlog onSubmit={handleNewBlog} />
          </Togglable>
          {
            blogs.map(blog => <Blog key={blog.id} blog={blog} onLike={handleLike} onRemove={handleRemove} />)
          }
        </div>
      }
    </div>
  )
}

export default App
