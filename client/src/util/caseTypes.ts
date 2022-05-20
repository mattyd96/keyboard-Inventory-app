export type Plate = {
  type: string;
  used: boolean;
}

export type Case = {
  _id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  hasWeight: boolean;
  weightMaterial: string;
  plates: Plate[];
  weight: string;
  weightUnits: string;
  built: boolean;
}

export type Data = {
  getInventory: {
    cases: Case[]
  }
}