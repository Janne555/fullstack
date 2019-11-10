import React from 'react'
import { User } from '../types'
type Props = {
  user?: User;
}

export default function UserView({ user }: Props): JSX.Element | null {
  if (!user)
    return null
  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
