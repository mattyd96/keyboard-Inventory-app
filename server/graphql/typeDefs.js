const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Case {
    creator: String,
    color: String,
    layout: String,
    caseMaterial: String,
    weightMaterial: String,
    weight: String,
    weightUnits: String,
    built: Boolean
  }

  input CaseInput {
    creator: String,
    color: String,
    layout: String,
    caseMaterial: String,
    weightMaterial: String,
    weight: String,
    weightUnits: String,
    built: Boolean
  }


  input SignupInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getUser: [User]
    getCases(username: String!): [Case]!
  }

  type Mutation{
    signup(signupinput: SignupInput): User
    login(username: String!, password: String!): User!
    addCase(caseinput: CaseInput): [Case]!
  }
`

module.exports = typeDefs;