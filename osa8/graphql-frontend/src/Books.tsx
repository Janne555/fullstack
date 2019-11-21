import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`

export default function Books() {
  const { loading, error, data } = useQuery<{ allBooks: { title: string, author: { name: string }, published: number }[] }>(BOOKS)

  if (loading)
    return <p>loading...</p>
  if (error || !data)
    return <p>error</p>

  return (
    <div>
      <h1>books</h1>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {
            data.allBooks.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
