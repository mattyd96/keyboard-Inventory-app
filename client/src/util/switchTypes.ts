import { Spring } from "./springTypes";

export type Switch = {
  id: string
  name: string
  stock: string
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