import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { User } from '../types'

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
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
