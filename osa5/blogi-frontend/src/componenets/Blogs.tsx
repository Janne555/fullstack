import React, { useState, useEffect } from 'react'
import { User } from '../../types'
import { Blog as BlogType } from '../../types'
import { getBlogs } from '../services/services'
import Blog from './Blog'

type Props = {
  user: User,
  onLogout: () => void
}

export default function Blogs({ user, onLogout }: Props) {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    let cancelled = false
    getBlogs(user.token)
      .then(blogs => {
        if (!cancelled)
          setBlogs(blogs)
      })
      .catch(console.error)
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      <h2>blogs for {user.username}</h2>
      <button onClick={onLogout}>logout</button>
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} />)
      }
    </div>
  )
}
