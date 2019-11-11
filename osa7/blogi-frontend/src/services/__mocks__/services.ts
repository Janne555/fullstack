import { Blog } from '../../types'

function getBlogs(): Promise<Blog[]> {
  return Promise.resolve([{
    author: 'kirjailija',
    id: 'id',
    likes: 420,
    title: 'otsikko',
    url: 'osoite',
    user: {
      username: 'käyttäjä'
    },
    comments: []
  }])
}

export { getBlogs }