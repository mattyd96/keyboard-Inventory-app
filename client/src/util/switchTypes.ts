import { Spring } from "./springTypes";

export type Switch = {
  id: string
  name: string
  stock: boolean
  films: string
  lube: string
  springs: Spring
  top: string
  bottom: string
  totalAmount: number
  availableAmount: number
}

export type Data = {
  getInventory: {
    switches: Switch[]
  }
}