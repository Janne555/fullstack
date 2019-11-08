import React, { useState } from 'react'
import { Credentials } from '../../types'
import PropTypes from 'prop-types'

type Props = {
  onSubmit: (credentials: Credentials) => void;
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px'
}

export default function LoginForm({ onSubmit }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.id === 'username')
      return setUsername(e.target.value)
    if (e.target.id === 'password')
      return setPassword(e.target.value)
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleSubmit} style={style}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="username">username</label>
          <input id="username" name="Username" value={username} onChange={handleChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="password">password</label>
          <input id="password" name="Password" type="password" value={password} onChange={handleChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
