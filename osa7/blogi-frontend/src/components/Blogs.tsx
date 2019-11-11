import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import * as Types from '../types'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

export default function Blogs(): JSX.Element {
  const blogs = useAppSelector<Types.Blog[]>(state => state.blogs)
  return (
    <List as='ul'>
      {
        blogs.map(blog => <List.Item key={blog.id} as='li'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></List.Item>)
      }
    </List>
  )
}
