import React, { useState, useContext } from 'react'
import { Blog as BlogType } from '../../types'
import { UserContext } from '../App'
import PropTypes from 'prop-types'

type Props = {
  blog: BlogType,
  onLike: (blog: BlogType) => void
  onRemove: (blog: BlogType) => void
}

Blog.propTypes = {
  blog: PropTypes.object,
  onLike: PropTypes.func,
  onRemove: PropTypes.func
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default function Blog({ blog, onLike, onRemove }: Props) {
  const [visible, setVisible] = useState(false)
  const currentUser = useContext(UserContext)

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(prev => !prev)}>{blog.title} {blog.author}</div>
      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={() => onLike(blog)}>like</button></div>
          <div>added by {blog.user.username}</div>
          {currentUser === blog.user.username && <button onClick={() => onRemove(blog)}>remove</button>}
        </div>
      }
    </div>
  )
}
