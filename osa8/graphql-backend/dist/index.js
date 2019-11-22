"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const author_1 = __importDefault(require("./models/author"));
const book_1 = __importDefault(require("./models/book"));
const user_1 = __importDefault(require("./models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const pubsub = new apollo_server_1.PubSub();
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "THIS_IS_SUPER_SECRET";
if (!MONGODB_URI)
    throw Error("no mongo uri");
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('debug', true);
mongoose_1.default.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => { console.log("connected to mongodb"); })
    .catch(error => { console.error('failed to connect to mongodb', error); });
const typeDefs = apollo_server_1.gql `
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
`;
const resolvers = {
    Query: {
        bookCount: () => book_1.default.collection.countDocuments(),
        authorCount: () => author_1.default.collection.countDocuments(),
        allBooks: (root, args) => {
            if (args.genre)
                return book_1.default.find({ genres: { $in: [args.genre] } }).populate('author');
            return book_1.default.find({}).populate('author');
        },
        allAuthors: async () => {
            return author_1.default.find({}).populate('bookCount');
        },
        me: (root, args, context) => {
            return context.currentUser;
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser)
                throw new apollo_server_1.UserInputError("missing auth");
            const author = await author_1.default.findOne({ name: args.author });
            if (!author)
                throw new apollo_server_1.UserInputError("no such author");
            try {
                const book = new book_1.default({
                    title: args.title,
                    published: args.published,
                    genres: args.genres,
                    author: author._id
                });
                await book.save();
                await book.populate('author').execPopulate();
                pubsub.publish('BOOK_ADDED', { bookAdded: book });
                return book;
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args
                });
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser)
                throw new apollo_server_1.UserInputError("missing auth");
            try {
                return await author_1.default.findOneAndUpdate({ name: args.name }, { born: args.setBornTo });
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args
                });
            }
        },
        addAuthor: async (root, args) => {
            try {
                const author = new author_1.default({
                    name: args.name,
                    born: args.born
                });
                return await author.save();
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args
                });
            }
        },
        login: async (root, args) => {
            const user = await user_1.default.findOne({ username: args.username });
            if (!user || args.password !== 'secret')
                throw new apollo_server_1.UserInputError("wrong credentials");
            const userForToken = {
                username: user.username,
                id: user._id
            };
            return { value: jsonwebtoken_1.default.sign(userForToken, JWT_SECRET) };
        },
        createUser: async (root, args) => {
            try {
                const user = new user_1.default({
                    username: args.username,
                    favoriteGenre: args.favoriteGenre
                });
                return user.save();
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args
                });
            }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jsonwebtoken_1.default.verify(auth.substring(7), JWT_SECRET);
            if (isToken(decodedToken)) {
                const currentUser = await user_1.default.findById(decodedToken.id);
                return { currentUser };
            }
            else {
                throw Error("whoopsie");
            }
        }
    }
});
function isToken(token) {
    return token.id !== undefined;
}
server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at  ${subscriptionsUrl}`);
});
