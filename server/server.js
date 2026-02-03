import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "John Doe", age: 30, Education:"Btech",isMarried: true },
  { id: "2", name: "Jane Smith", age: 25, Education:"MS", isMarried: false },
  { id: "3", name: "Alice Johnson", age: 28, Education:"Arts",isMarried: false },
];

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, age: Int!, Education:String!, isMarried: Boolean!): User
  }

  type User {
    id: ID
    name: String
    age: Int
    Education:String
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (_, args) => users.find(u => u.id === args.id),
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        id: (users.length + 1).toString(),
        ...args,
      };
      users.push(newUser);
      return newUser; // ✅ REQUIRED
    },
  },
};

// const server = new ApolloServer({ typeDefs, resolvers });
const PORT = process.env.PORT || 4000;


const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  cors: {
    origin: "*",
  },
});

console.log(`🚀 Server running at ${url}`);
