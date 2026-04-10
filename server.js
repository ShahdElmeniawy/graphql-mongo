import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import connectDB from "./db.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";

dotenv.config();

// Connect to MongoDB before starting the server
await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3200 },
});

console.log(`🚀 Server ready at ${url}`);