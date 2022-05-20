const { gql } = require('apollo-server');

const typeDefs = gql`

  type Plate {
    _id: ID
    type: String
    used: Boolean
  }

  type Case {
    _id: ID
    name: String
    creator: String
    color: String
    layout: String
    caseMaterial: String
    hasWeight: Boolean
    weightMaterial: String
    plates: [Plate]
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
    id: ID!
    username: String
    cases: [Case]
    stockSwitches: [Switch]
    modSwitches: [Switch]
    springs: [Spring]
    stabs: [Stab]
    keycaps: [Keycap]
    artisans: [Artisan]
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    inventory: Inventory!
  }

  input CaseInput {
    name: String
    creator: String
    color: String
    layout: String
    caseMaterial: String
    hasWeight: Boolean
    weightMaterial: String
    plates: [String]
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
    getInventory: Inventory
  }

  type Mutation{
    signup(signupinput: SignupInput): User
    login(username: String!, password: String!): User!
    addCase(caseinput: CaseInput): Inventory
    deleteCase(id: ID): Inventory
    updateCase(id: ID, caseinput: CaseInput): Inventory
  }
`

module.exports = typeDefs;