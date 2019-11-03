import React, { useState } from 'react'
import { Blog as BlogType } from '../../types'

type Props = {
  blog: BlogType,
  onLike: (blog: BlogType) => void
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default function Blog({ blog, onLike }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(prev => !prev)}>{blog.title} {blog.author}</div>
      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => onLike(blog)}>like</button></div>
          <div>added by {blog.user.username}</div>
        </div>
      }
    </div>
  )
}
