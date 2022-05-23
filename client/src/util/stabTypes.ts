export type Wire = {
  twoU: number
  sixU: number
  six25U: number
  sevenU: number
}

export type Stab = {
  id: string
  name: string
  wires: Wire
  housings: number
  stems: number
}

export type Data = {
  getInventory: {
    stabs: Stab[]
  }
}