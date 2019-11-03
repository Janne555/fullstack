import axios from 'axios'
import { Credentials, User, Blog, NewBlog } from '../../types'

const BLOGS_URL = '/api/blog'
const LOGIN_URL = '/api/login'

export function getBlogs(token: string) {
  return axios.get<Blog[]>(BLOGS_URL, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data)
}

export function createBlog(blog: NewBlog, token: string) {
  return axios.post<Blog>(BLOGS_URL, blog, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data)
}

export function login(credentials: Credentials): Promise<User> {
  return axios.post<User>(LOGIN_URL, credentials).then(response => response.data)
}

export function putBlog(blog: Blog, token: string) {
  return axios.put(`${BLOGS_URL}/${blog.id}`, blog, { headers: { Authorization: `Bearer ${token}` } })
}

export function removeBlog(blog: Blog, token: string) {
  return axios.delete(`${BLOGS_URL}/${blog.id}`, { headers: { Authorization: `Bearer ${token}` } })
}