import React, { useState, useContext } from 'react';
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from './App';
import { Author } from './types';

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
  const { loading, error, data } = useQuery<{ allAuthors: Author[] }>(AUTHORS)
  const { token } = useContext(AuthContext)

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
      {token && <AuthorUpdate authors={data.allAuthors} />}
    </div>
  );
}

function AuthorUpdate({ authors }: { authors: { name: string, born?: number, bookCount: number }[] }) {
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: AUTHORS }] })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>name</label>
        <select onChange={e => setName(e.target.value)}>
          <option></option>
          {
            authors.map(author => (
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
  )
}

export default Authors;
