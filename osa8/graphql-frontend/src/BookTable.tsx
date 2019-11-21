import React from 'react'
import { Book } from './types'

export default function BookTable({ books }: { books: Book[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
          <th>genres</th>
        </tr>
      </thead>
      <tbody>
        {
          books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(", ")}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
