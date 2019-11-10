import React from 'react'
import { Blog } from '../../types'

type Props = {
  blog: Blog;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SimpleBlog({ blog, onClick }: Props): JSX.Element {
  return (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        blog has {blog.likes} likes
        <button onClick={onClick}>like</button>
      </div>
    </div>
  )
}
