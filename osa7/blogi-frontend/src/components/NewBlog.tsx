import React, { useState } from 'react'
import { NewBlog as NewBlogType } from '../types'
import { Form, Button } from 'semantic-ui-react'

type Props = {
  onSubmit: (blog: NewBlogType) => void;
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px'
}

export default function NewBlog({ onSubmit }: Props): JSX.Element {
  function handleSubmit(e: any): void {
    e.preventDefault()
    const title = e.target[0].value as string
    const author = e.target[1].value as string
    const url = e.target[2].value as string
    onSubmit({ title, author, url })
  }


  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit} style={style}>
        <Form.Field>
          <label>title</label>
          <input placeholder="title" name="title" />
        </Form.Field>
        <Form.Field>
          <label >author</label>
          <input placeholder="author" name="author" />
        </Form.Field>
        <Form.Field placeholder="url">
          <label>url</label>
          <input placeholder="url" name="url" />
        </Form.Field>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )
}
