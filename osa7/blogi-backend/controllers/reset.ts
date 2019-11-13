import { Router } from 'express'
import User from '../models/user'
import Blog from '../models/blog'

const resetRouter = Router()

resetRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

export default resetRouter