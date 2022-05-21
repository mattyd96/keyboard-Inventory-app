export type Spring = {
  _id: string
  name: String
  type: String
  weight: String
  length: String
  lube: String
  amount: number
}

export type Data = {
  getInventory: {
    springs: Spring[]
  }
}