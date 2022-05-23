export type Artisan = {
  id: string
  name: string
  maker: string
  sculpt: string
  colorway: string
  totalMade: number
  owned: number
}

export type Data = {
  getInventory: {
    artisans: Artisan[]
  }
}