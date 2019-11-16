import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { AUTHORS } from './Authors'


const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export default function BookForm() {
  const [genres, setGenres] = useState<string[]>([])
  const [genre, setGenre] = useState<string>('')
  const [addBook, { data }] = useMutation(ADD_BOOK, { refetchQueries: [{ query: AUTHORS }] })

  function addGenre(e: React.MouseEvent<HTMLButtonElement>) {
    if (!genre)
      return
    setGenres(gs => gs.concat(genre))
    setGenre('')
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    const title = e.target[0].value
    const author = e.target[1].value
    const published = Number(e.target[2].value)
    addBook({ variables: { title, author, published, genres } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input name="title" required />
        </div>
        <div>
          <label>author</label>
          <input name="author" required />
        </div>
        <div>
          <label>published</label>
          <input name="published" type="number" required />
        </div>
        <div>
          <div>
            <input name="title" value={genre} onChange={e => setGenre(e.target.value)} />
            <button type="button" onClick={addGenre}>add genre</button>
          </div>

          {genres.length !== 0 && <span>genres: {genres.join(' ')}</span>}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}
