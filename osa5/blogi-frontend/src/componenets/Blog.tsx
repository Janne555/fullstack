import React from 'react'

type Props = {
  blog: {
    title: string
    author: string
  }
}

export default function Blog({ blog }: Props) {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )
}
