import React from 'react'
import { Credentials } from '../types'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { Form, Segment } from 'semantic-ui-react'

type Props = {
  onSubmit: (credentials: Credentials) => void;
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '200px'
}

export default function LoginForm({ onSubmit }: Props): JSX.Element {
  const { reset: resetUsername, ...userName } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    onSubmit({ username: userName.value, password: password.value })
    resetUsername()
    resetPassword()
  }

  return (
    <Segment>
      <h1>log in to application</h1>
      <Form onSubmit={handleSubmit} style={style}>
        <Form.Field>
          <label>username</label>
          <input id="username" name="Username" {...userName} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id="password" name="Password" {...password} />
        </Form.Field>
        <button type="submit">login</button>
      </Form>
    </Segment>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
