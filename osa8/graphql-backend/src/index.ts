import { ApolloServer, gql, UserInputError } from 'apollo-server'
import shortid from 'shortid'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Author from './models/author'
import Book from './models/book'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI)
  throw Error("no mongo uri")

mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log("connected to mongodb") })
  .catch(error => { console.error('failed to connect to mongodb', error) })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    addAuthor(
      name: String!
      born: Int
    ): Author!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root: any, args: { author?: string, genre?: string }) => {
      if (args.genre)
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root: any, args: any) => {
      const author = await Author.findOne({ name: args.author })
      console.log(author)
      if (!author)
        throw new UserInputError("no such author")
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      })
      await book.save();
      await book.execPopulate()
      return book
    },
    editAuthor: (root: any, args: { name: string, setBornTo: number }) => {
      return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
    },
    addAuthor: (root: any, args: { name: string, born?: number }) => {
      console.log(args)
      const author = new Author({
        name: args.name,
        born: args.born
      })
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})