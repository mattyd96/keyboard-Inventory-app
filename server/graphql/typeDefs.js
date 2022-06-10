const { gql } = require('apollo-server');

const typeDefs = gql`

  type Plate {
    id: ID
    type: String
    used: Boolean
  }

  type Case {
    id: ID
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
    id: ID!
    name: String
    amount: Int
  }

  type Keycap {
    id: ID!
    name: String
    manufacturer: String
    material: String
    kits: [Kit]
  }

  type Spring {
    id: ID!
    name: String
    type: String
    weight: String
    length: String
    lube: String
    amount: Int
  }

  type Switch {
    id: ID!
    name: String
    stock: String
    films: String
    lube: String
    springs: Spring
    top: String
    bottom: String
    totalAmount: Int
    availableAmount: Int
  }

  type Wire {
    twoU: Int
    sixU: Int
    six25U: Int
    sevenU: Int
  }

  type Stab {
    id: ID!
    name: String
    wires: Wire
    housings: Int
    stems: Int
  }

  type Artisan {
    id: ID!
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
    switches: [Switch]
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

  type Image {
    id: ID
    link: String
  }

  type SwitchAmount {
    id: ID
    amount: Int
  }

  type StabAmount {
    stabId: ID
    housings: Int,
    stems: Int,
    sevenU: Int,
    sixU: Int,
    six25U: Int,
    twoU: Int
  }

  type Build {
    id: ID
    name: String
    description: String
    case: Case
    switches: [Switch]
    switchAmount: [SwitchAmount]
    stabs: [Stab]
    stabAmount: [StabAmount]
    keycaps: [Keycap]
    images: [String]
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

  input SpringInput {
    id: ID
    name: String
    type: String
    weight: String
    length: String
    lube: String
    amount: Int
  }

  input StabInput {
    name: String
    twoU: Int
    sixU: Int
    six25U: Int
    sevenU: Int
    housings: Int
    stems: Int
  }

  input ArtisanInput {
    name: String
    maker: String
    sculpt: String
    colorway: String
    totalMade: Int
    owned: Int
  }

  input KitInput {
    id: ID
    name: String
    amount: Int
  }

  input KeycapInput {
    name: String
    manufacturer: String
    material: String
    kits: [KitInput]
  }

  input SwitchInput {
    name: String
    stock: String
    films: String
    lube: String
    springs: SpringInput
    top: String
    bottom: String
    totalAmount: Int
    availableAmount: Int
  }

  input SwitchBuildInput {
    id: ID
    name: String
    amount: Int 
  }

  input KeycapBuildInput {
    id: ID
    set: String
  }

  input StabBuildInput {
    id: ID
    name: String
    twoU: Int
    sixU: Int
    six25U: Int 
    sevenU: Int
  }

  input ImageBuildInput {
    id: ID 
    link: String
  }

  input BuildInput {
    name: String
    description: String 
    case: ID
    switches: [SwitchBuildInput]
    keycaps: [KeycapBuildInput]
    stabs: [StabBuildInput]
    images: [String]
  }

  input SignupInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getUser: [User]
    getInventory: Inventory
    getUserBuilds: [Build]
    getBuild(id: ID): Build
  }

  type Mutation{
    signup(signupinput: SignupInput): User
    login(username: String!, password: String!): User!

    addCase(caseinput: CaseInput): Inventory
    deleteCase(id: ID): Inventory
    updateCase(id: ID, caseinput: CaseInput): Inventory

    addSpring(springinput: SpringInput): Inventory
    deleteSpring(id: ID): Inventory
    updateSpring(id: ID, springinput: SpringInput): Inventory

    addStab(stabinput: StabInput): Inventory
    deleteStab(id: ID): Inventory
    updateStab(id: ID, stabinput: StabInput): Inventory

    addArtisan(artisaninput: ArtisanInput): Inventory
    deleteArtisan(id: ID): Inventory
    updateArtisan(id: ID, artisaninput: ArtisanInput): Inventory

    addKeycap(keycapinput: KeycapInput): Inventory
    deleteKeycap(id: ID): Inventory
    updateKeycap(id: ID, keycapinput: KeycapInput): Inventory

    addSwitch(switchinput: SwitchInput): Inventory
    deleteSwitch(id: ID): Inventory
    updateSwitch(id: ID, switchinput: SwitchInput): Inventory

    addBuild(buildInput: BuildInput): Build
    deleteBuild(id: ID): ID
    updateBuild(id: ID, buildInput: BuildInput): Build
  }
`

module.exports = typeDefs;