import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { Blog as BlogType } from '../../types'
import '@testing-library/jest-dom/extend-expect'

describe('<Blog />', () => {
  const blog: BlogType = {
    author: 'kirjailija',
    id: 'id',
    likes: 420,
    title: 'otsikko',
    url: 'osoite',
    user: {
      username: 'käyttäjä'
    }
  }

  test('should render title and author but not likes, address or who added it', () => {
    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const { queryByText } = render(<Blog blog={blog} onLike={mockLike} onRemove={mockRemove} />)
    expect(queryByText(text => text.includes('kirjailija'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('otsikko'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('420'))).not.toBeInTheDocument()
    expect(queryByText(text => text.includes('osoite'))).not.toBeInTheDocument()
    expect(queryByText(text => text.includes('käyttäjä'))).not.toBeInTheDocument()
  })

  test('should show everything after clicking the title', () => {
    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const { queryByText, getByText } = render(<Blog blog={blog} onLike={mockLike} onRemove={mockRemove} />)
    fireEvent.click(getByText(text => text.includes('otsikko')))
    expect(queryByText(text => text.includes('kirjailija'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('otsikko'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('420'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('osoite'))).toBeInTheDocument()
    expect(queryByText(text => text.includes('käyttäjä'))).toBeInTheDocument()
  })
})
