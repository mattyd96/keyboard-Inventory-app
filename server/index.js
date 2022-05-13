const { ApolloServer } = require('apollo-server'); // apollo server for graphQL handling
const mongoose = require('mongoose'); // mongoose for mondoDB
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = require('./graphql/typeDefs'); // graphQL typedefs
const resolvers = require('./graphql/resolvers/index'); // graphQL resolvers

const PORT = process.env.PORT || 4000; // get port from server provider or run locally


const server = new ApolloServer({typeDefs, resolvers, context: ({ req }) => ({ req })});
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
.then (() => {
  return server.listen({port: PORT});
})
.then(res => {
  console.log(`Server running at ${res.url}`);
})
.catch(err => {
  console.error(err);
});