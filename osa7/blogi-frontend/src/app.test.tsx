import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { render, waitForDomChange, RenderResult } from '@testing-library/react'

jest.mock('./services/services')
import App from './App'
import { act } from 'react-dom/test-utils'

describe('<App />', () => {
  afterEach(localStorage.clear)

  test('if no user logged, notes are not rendered', async () => {
    const { queryByText } = render(<App />)
    expect(queryByText('username')).toBeInTheDocument()
    expect(queryByText('blogs')).not.toBeInTheDocument()
  })

  test('if no user logged, notes are not rendered', async () => {
    localStorage.setItem('userName', 'testaaja')
    localStorage.setItem('token', 'tokeni')
    let component: RenderResult | undefined
    await act(async () => {
      component = render(<App />)
      await waitForDomChange()
    })
    if (!component)
      throw Error()
    expect(component.queryByText('blogs for testaaja')).toBeInTheDocument()
  })
})