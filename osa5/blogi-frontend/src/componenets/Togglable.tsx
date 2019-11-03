import React, { useState, CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  buttonLabel: string
}

export default function Togglable({ children, buttonLabel }: Props) {
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(prev => !prev)
  }

  const hideWhenVisible: CSSProperties = { display: visible ? "none" : "" }
  const showWhenVisible: CSSProperties = { display: visible ? "" : "none" }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
