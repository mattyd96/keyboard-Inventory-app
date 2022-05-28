export type Spring = {
  __typename: string
  id: string
  name: string
  type: string
  weight: string
  length: string
  lube: string
  amount: number
}

export type Data = {
  getInventory: {
    springs: Spring[]
  }
}