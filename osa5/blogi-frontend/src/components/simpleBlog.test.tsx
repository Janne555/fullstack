import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { Blog } from '../../types'

describe('<SimpleBlog />', () => {
  const blog: Blog = {
    author: 'kirjailija',
    id: 'id',
    likes: 420,
    title: 'otsikko',
    url: 'osoite',
    user: {
      username: 'käyttäjä'
    }
  }

  test('should render fields', () => {
    const mockFn = jest.fn()
    const { queryByText } = render(<SimpleBlog blog={blog} onClick={mockFn} />)
    expect(queryByText(text => text.includes('kirjailija'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('otsikko'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('420'))).toBeInTheDocument()
  })
})
