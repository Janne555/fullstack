import React from 'react';
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

export const AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors: React.FC = () => {
  const { loading, error, data } = useQuery<{ allAuthors: { name: string, born?: number, bookCount: number }[] }>(AUTHORS)

  if (loading)
    return <p>loading...</p>
  if (error || !data)
    return <p>error</p>

  return (
    <div>
      <h1>authors</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {
            data.allAuthors.map(author => (
              <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Authors;
