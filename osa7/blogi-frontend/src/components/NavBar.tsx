import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { logout } from '../reducers/user'

export default function NavBar(): JSX.Element {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  function handleLogout(): void {
    dispatch(logout())
  }

  return (
    <div className="navbar">
      <div>
        <Link to="/blogs">blogs</Link>
      </div>
      <div>
        <Link to="/users" >users</Link>
      </div>
      <div>
        {user && `${user.username} logged in`}
      </div>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}
