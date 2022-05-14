const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input SignupInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getUser: [User]
  }

  type Mutation{
    signup(signupinput: SignupInput): User
    login(username: String!, password: String!): User!
  }
`

module.exports = typeDefs;