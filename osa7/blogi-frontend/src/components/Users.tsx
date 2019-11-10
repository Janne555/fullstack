import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { User } from '../types'
import { Link } from 'react-router-dom'

export default function Users(): JSX.Element {
  const users = useAppSelector<User[]>(state => state.users)
  return (
    <table>
      <thead>
        <tr>
          <th>user</th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
