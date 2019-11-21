import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.virtual('bookCount', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  count: true
})

export default model('Author', schema)