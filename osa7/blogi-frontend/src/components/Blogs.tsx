import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import * as Types from '../types'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

export default function Blogs(): JSX.Element {
  const blogs = useAppSelector<Types.Blog[]>(state => state.blogs)
  return (
    <List>
      {
        blogs.map(blog => (
          <List.Item key={blog.id}>
            <List.Icon name="blogger" />
            <List.Content>
              <Link data-cy={`blog-${blog.title}`} to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </List.Content>
          </List.Item>))
      }
    </List>
  )
}
