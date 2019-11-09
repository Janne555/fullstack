import React from 'react'
import { Credentials } from '../../types'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

type Props = {
  onSubmit: (credentials: Credentials) => void;
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px'
}

export default function LoginForm({ onSubmit }: Props): JSX.Element {
  const userName = useField('text')
  const password = useField('password')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    onSubmit({ username: userName.value, password: password.value })
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleSubmit} style={style}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="username">username</label>
          <input id="username" name="Username" {...userName} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="password">password</label>
          <input id="password" name="Password" {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
