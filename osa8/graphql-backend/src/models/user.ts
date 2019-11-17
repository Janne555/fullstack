import { Schema, model, Document } from 'mongoose'

interface User extends Document {
  username: string
  favoriteGenre: string
}

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: String
})
 
export default model<User>('User', schema)