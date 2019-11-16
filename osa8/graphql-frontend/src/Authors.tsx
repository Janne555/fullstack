import React, { useState } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks';

export const AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
    }
  }
`

const Authors: React.FC = () => {
  const { loading, error, data } = useQuery<{ allAuthors: { name: string, born?: number, bookCount: number }[] }>(AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: AUTHORS }] })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
  }

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <select onChange={e => setName(e.target.value)}>
            <option></option>
            {
              data.allAuthors.map(author => (
                <option key={author.name} value={author.name}>{author.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label>born</label>
          <input type="number" name="born" value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
}

export default Authors;
