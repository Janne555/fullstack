import { ApolloServer, gql, UserInputError, PubSub } from 'apollo-server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Author from './models/author'
import Book from './models/book'
import User from './models/user'
import jwt from 'jsonwebtoken'
dotenv.config()
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = "THIS_IS_SUPER_SECRET"

if (!MONGODB_URI)
  throw Error("no mongo uri")

mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log("connected to mongodb") })
  .catch(error => { console.error('failed to connect to mongodb', error) })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
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
    allAuthors: async () => {
      return Author.find({}).populate('bookCount')
    },
    me: (root: any, args: any, context: any) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root: any, args: any, context: any) => {
      if (!context.currentUser)
        throw new UserInputError("missing auth")
      const author = await Author.findOne({ name: args.author })
      if (!author)
        throw new UserInputError("no such author")
      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })
        await book.save()
        await book.populate('author').execPopulate()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root: any, args: { name: string, setBornTo: number }, context: any) => {
      if (!context.currentUser)
        throw new UserInputError("missing auth")
      try {
        return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo });
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    addAuthor: async (root: any, args: { name: string, born?: number }) => {
      try {
        const author = new Author({
          name: args.name,
          born: args.born
        })
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root: any, args: any) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret')
        throw new UserInputError("wrong credentials")

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    createUser: async (root: any, args: any) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      if (isToken(decodedToken)) {
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      } else {
        throw Error("whoopsie")
      }
    }
  }
})

function isToken(token: any): token is { id: string } {
  return token.id !== undefined
}

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at  ${subscriptionsUrl}`)
})