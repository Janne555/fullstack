import React, { useState } from 'react'
import { NewBlog as NewBlogType } from '../types'

type Props = {
  onSubmit: (blog: NewBlogType) => void;
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px'
}

export default function NewBlog({ onSubmit }: Props): JSX.Element {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.id === 'title')
      return setTitle(e.target.value)
    if (e.target.id === 'author')
      return setAuthor(e.target.value)
    if (e.target.id === 'url')
      return setUrl(e.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} style={style}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="title">title</label>
          <input id="title" name="title" value={title} onChange={handleChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="author">author</label>
          <input id="author" name="author" value={author} onChange={handleChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="url">url</label>
          <input id="url" name="url" value={url} onChange={handleChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
