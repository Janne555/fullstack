import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks';
import { Book } from './types'
import BookTable from './BookTable'

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export default function Books() {
  const [getBooks, { loading, data, error }] = useLazyQuery<{ allBooks: Book[] }>(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState<string | null>(null)

  useEffect(() => {
    if (genre)
      getBooks({ variables: { genre } })
    else
      getBooks()
  }, [genre, getBooks])

  if (loading)
    return <p>loading...</p>
  if (error || !data)
    return <p>error</p>

  return (
    <div>
      <h1>books</h1>
      <button onClick={() => setGenre(null)}>reset</button>
      {
        Array.from(new Set(data.allBooks
          .flatMap(book => book.genres)))
          .map(genre => (
            <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>
          ))
      }
      <BookTable books={data.allBooks} />
    </div>
  )
}
