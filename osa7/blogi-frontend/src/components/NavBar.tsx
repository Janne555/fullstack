import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { logout } from '../reducers/user'
import { Menu } from 'semantic-ui-react'

export default function NavBar(): JSX.Element {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  function handleLogout(): void {
    dispatch(logout())
  }

  return (
    <Menu>
      <Menu.Item>
        <Link to="/blogs">blogs</Link>
      </Menu.Item>
      <Menu.Item>
        <Link data-cy="users" to="/users" >users</Link>
      </Menu.Item>
      <Menu.Item>
        {user && `${user.username} logged in`}
      </Menu.Item>
      <Menu.Item
        data-cy="logout"
        onClick={handleLogout}
      >
        logout
      </Menu.Item>
    </Menu>
  )
}
