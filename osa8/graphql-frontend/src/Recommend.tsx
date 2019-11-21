import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { Book } from './types'
import BookTable from './BookTable'
import { BOOKS_BY_GENRE } from './Books'

const ME = gql`
  {
    me {
      favoriteGenre
    }
  }
`

export default function Recommend() {
  const [getBooks, { loading, data, error }] = useLazyQuery<{ allBooks: Book[] }>(BOOKS_BY_GENRE)
  const meResult = useQuery<{ me: { favoriteGenre: string } }>(ME)

  useEffect(() => {
    if (meResult.data)
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
  }, [meResult.data, getBooks])

  if (loading || meResult.loading)
    return <p>loading...</p>
  if (error || !data || meResult.error || !meResult.data)
    return <p>error</p>

  return (
    <div>
      <h1>recommendations</h1>
      <p>books in your favorite genre <b>{meResult.data.me.favoriteGenre}</b></p>
      <BookTable books={data.allBooks} />
    </div>
  )
}
