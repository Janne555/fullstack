import { Blog, Action, AppAsyncAction } from '../types'
import Axios from 'axios'
import { setNotification } from './notification'

export const initBlogs = (): AppAsyncAction<Action.InitBlogs> => {
  return async (dispatch): Promise<void> => {
    try {
      const { data: blogs } = await Axios.get<Blog[]>('/api/blog')
      dispatch({ type: 'INIT_BLOGS', blogs })
    } catch (error) {
      console.error(error)
      dispatch(setNotification('could not get blogs', true))
    }
  }
}

export const createBlog = (title: string, author: string, url: string): AppAsyncAction<Action.InitBlogs> => {
  return async (dispatch, getState): Promise<void> => {
    try {
      await Axios.post<Blog[]>('/api/blog', { title, author, url, votes: 0 }, { headers: { Authorization: `Bearer ${getState().user.token}` } })
      dispatch(initBlogs())
      dispatch(setNotification(`a new blog ${title} by ${author} added`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('could not create blog', true))
    }
  }
}

export const likeBlog = (blog: Blog): AppAsyncAction<Action.InitBlogs> => {
  return async (dispatch, getState): Promise<void> => {
    try {
      await Axios.put(`/api/blog/${blog.id}`, { ...blog, likes: blog.likes + 1 }, { headers: { Authorization: `Bearer ${getState().user.token}` } })
      dispatch(initBlogs())
      dispatch(setNotification(`liked blog "${blog.title}"`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('could not update blog', true))
    }
  }
}

export const removeBlog = (blog: Blog): AppAsyncAction<Action.InitBlogs> => {
  return async (dispatch, getState): Promise<void> => {
    try {
      await Axios.delete(`/api/blog/${blog.id}`, { headers: { Authorization: `Bearer ${getState().user.token}` } })
      dispatch(initBlogs())
      dispatch(setNotification(`deleted blog "${blog.title}"`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('could not delete blog', true))
    }
  }
}



function blogs(blogs: Blog[] = [], { type, ...content }: Action.BlogAction): Blog[] {
  switch (type) {
    case 'INIT_BLOGS':
      return content.blogs
    default:
      return blogs
  }
}

export default blogs