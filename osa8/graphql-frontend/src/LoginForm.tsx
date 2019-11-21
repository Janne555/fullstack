import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from './App'
const LOGIN = gql`
  mutation login ($username: String!, $password: String!) {
    login (
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export default function LoginForm() {
  const [login] = useMutation<{ login: { value: string } }>(LOGIN)
  const { updateToken } = useContext(AuthContext)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = data.get("username")
    const password = data.get("password")
    try {
      const result = await login({ variables: { username, password } })
      if (!result.data)
        throw Error("")
      updateToken(result.data.login.value)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input name="username" />
        </div>
        <div>
          <label>password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
