import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery, useSubscription } from '@apollo/react-hooks';
import { Book } from './types'
import BookTable from './BookTable'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`



const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export default function Books() {
  const [getBooks, { loading, data, error }] = useLazyQuery<{ allBooks: Book[] }>(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState<string | null>(null)
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const dataInStore = client.readQuery({ query: BOOKS_BY_GENRE })
      if (!dataInStore.allBooks.some((book: Book) => book.title === subscriptionData.data.bookAdded.title)) {
        window.alert(`book titled "${subscriptionData.data.bookAdded.title}" added`)
        client.writeQuery({
          query: BOOKS_BY_GENRE,
          data: { allBooks: dataInStore.allBooks.concat(subscriptionData.data.bookAdded) }
        })
      }
    },
  })

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
