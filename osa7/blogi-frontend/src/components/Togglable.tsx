import React, { useState, CSSProperties, ReactNode } from 'react'
import { Button } from 'semantic-ui-react'

type Props = {
  children: ReactNode;
  buttonLabel: string;
}

export default function Togglable({ children, buttonLabel }: Props): JSX.Element {
  const [visible, setVisible] = useState(false)

  function toggleVisibility(): void {
    setVisible(prev => !prev)
  }

  const hideWhenVisible: CSSProperties = { display: visible ? 'none' : '' }
  const showWhenVisible: CSSProperties = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button data-cy="new-blog" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}
