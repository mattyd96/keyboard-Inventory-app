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
    name: String
    creator: String
    color: String
    layout: String
    caseMaterial: String
    weightMaterial: String
    weight: String
    weightUnits: String
    built: Boolean
  }

  type Kit {
    name: String
    amount: Int
  }

  type Keycap {
    name: String
    manufacturer: String
    material: String
    kits: [Kit]
  }

  type Spring {
    name: String
    type: String
    weight: String
    length: String
    lube: String
    amount: Int
  }

  type Switch {
    name: String,
    stock: Boolean
    films: String
    lube: String
    springs: [Spring]
    top: String
    bottom: String
    amount: Int
  }

  type Wire {
    twoU: Int
    six25U: Int
    sevenU: Int
  }

  type Stab {
    name: String
    manufacturer: String
    wires: Wire
    housings: Int
    stem: Int
  }

  type Artisan {
    name: String
    maker: String
    sculpt: String
    colorway: String
    totalMade: Int
    owned: Int
  }

  type Inventory {
    username: String
    cases: [Case]
    stockSwitches: [Switch]
    modSwitches: [Switch]
    springs: [Spring]
    stabs: [Stab]
    keycaps: [Keycap]
    artisans: [Artisan]
  }

  input CaseInput {
    name: String
    creator: String
    color: String
    layout: String
    caseMaterial: String
    weightMaterial: String
    weight: String
    weightUnits: String
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
    addCase(caseinput: CaseInput): Inventory
  }
`

module.exports = typeDefs;