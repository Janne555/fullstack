import { Schema, model } from 'mongoose'
import { IBlog } from '../types'

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [String]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    if (!('comments' in returnedObject))
      returnedObject.commments = []
  }
})

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog