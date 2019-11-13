import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { Blog } from '../types'

describe('<SimpleBlog />', () => {
  const blog: Blog = {
    author: 'kirjailija',
    id: 'id',
    likes: 420,
    title: 'otsikko',
    url: 'osoite',
    user: {
      username: 'käyttäjä'
    },
    comments: []
  }

  test('should render fields', () => {
    const mockFn = jest.fn()
    const { queryByText } = render(<SimpleBlog blog={blog} onClick={mockFn} />)
    expect(queryByText(text => text.includes('kirjailija'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('otsikko'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('420'))).toBeInTheDocument()
  })

  test('should call onclick twice if bugtton is clicked twice', () => {
    const mockFn = jest.fn()
    const { getByText } = render(<SimpleBlog blog={blog} onClick={mockFn} />)
    fireEvent.click(getByText('like'))
    fireEvent.click(getByText('like'))
    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})
