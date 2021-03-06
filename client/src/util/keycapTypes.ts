export type Kit = {
  id: string
  name: string
  amount: number
}

export type Keycap = {
  id: string
  name: string
  manufacturer: string
  material: string
  kits: Kit[]
}

export type Data = {
  getInventory: {
    keycaps: Keycap[]
  }
}