import React from 'react'
import { Blog as BlogType, State } from '../types'
import PropTypes from 'prop-types'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { likeBlog, removeBlog } from '../reducers/blogs'
import * as Types from '../types'
import { useHistory } from 'react-router'

type Props = {
  blog: BlogType | undefined;
}

export default function Blog({ blog }: Props): JSX.Element | null {
  const { username: currentUser } = useAppSelector<State.User>(state => state.user)
  const dispatch = useAppDispatch()
  const history = useHistory()

  function handleLike(blog: Types.Blog): void {
    dispatch(likeBlog(blog))
  }

  function handleRemove(blog: Types.Blog): void {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (!ok)
      return
    dispatch(removeBlog(blog))
    history.push('/')
  }

  if (!blog)
    return null

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={(): void => handleLike(blog)}>like</button></div>
      <div>added by {blog.user.username}</div>
      {currentUser === blog.user.username && <button onClick={(): void => handleRemove(blog)}>remove</button>}
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object,
  onLike: PropTypes.func,
  onRemove: PropTypes.func
}