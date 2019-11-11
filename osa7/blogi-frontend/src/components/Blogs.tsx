import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import * as Types from '../types'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default function Blogs(): JSX.Element {
  const blogs = useAppSelector<Types.Blog[]>(state => state.blogs)
  return (
    <div>
      {
        blogs.map(blog => <div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)
      }
    </div>
  )
}
