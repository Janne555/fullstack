import React, { useEffect } from 'react'
import Message from './components/Message'
import * as Types from './types'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import Togglable from './components/Togglable'
import UserView from './components/UserView'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { initUser, login, logout } from './reducers/user'
import { createBlog, initBlogs } from './reducers/blogs'
import { initUsers } from './reducers/users'
import { Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import './app.css'
import { Segment } from 'semantic-ui-react'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { message } = useAppSelector<Types.State.Notification>(state => state.notification)
  const { username } = useAppSelector<Types.State.User>(state => state.user)
  const users = useAppSelector<Types.User[]>(state => state.users)
  const blogs = useAppSelector<Types.Blog[]>(state => state.blogs)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
    dispatch(initUsers())
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


  function getUserById(id: string): Types.User | undefined {
    return users.find(user => user.id === id)
  }

  function getBlogById(id: string): Types.Blog | undefined {
    return blogs.find(blog => blog.id === id)
  }

  if (!username)
    return (
      <div>
        {message && <Message />}
        <LoginForm onSubmit={handleLogin} />
      </div>
    )

  return (
    <div>
      <NavBar />
      <Segment>
        {message && <Message />}
        <h1>blogs</h1>
        <h2>blogs for {username}</h2>
        <Route exact path={['/blogs', '/']}>
          <div>
            <Togglable buttonLabel="new blog">
              <NewBlog onSubmit={handleNewBlog} />
            </Togglable>
            <Blogs />
          </div>
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id" render={({ match }): JSX.Element => <UserView user={getUserById(match.params.id)} />} />
        <Route exact path="/blogs/:id" render={({ match }): JSX.Element => <Blog blog={getBlogById(match.params.id)} />} />
      </Segment>
    </div>
  )
}

export default App
