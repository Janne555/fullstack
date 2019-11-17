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
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
    throw Error("no mongo uri");
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => { console.log("connected to mongodb"); })
    .catch(error => { console.error('failed to connect to mongodb', error); });
const typeDefs = apollo_server_1.gql `
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
        allAuthors: () => {
            return author_1.default.find({});
        }
    },
    Mutation: {
        addBook: async (root, args) => {
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
                await book.execPopulate();
                return book;
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error.message, {
                    invalidArgs: args
                });
            }
        },
        editAuthor: async (root, args) => {
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
        }
    }
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
});
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
