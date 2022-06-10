// const buildSchema = new Schema({
//   username: { type: String, required: true},
//   case: caseSchema,
//   switches: switchSchema, //will have a switchSchema
//   stabs: stabSchema, // will have a stab schema
//   keycaps: keycapSchema, // will have a keycaps schema
//   images: [String]
// });

import { Case } from "./caseTypes";
import { Switch } from "./switchTypes";
import { Stab } from "./stabTypes";
import { Keycap } from "./keycapTypes";

export type SwitchAmount = {
  id: string
  amount: number
}

export type StabAmount = {
  stabId: string
  housings: number,
  stems: number,
  sevenU: number,
  sixU: number,
  six25U: number,
  twoU: number
}

export type Build = {
  id: string
  username: string
  name: string
  description: string
  case: Case
  switches: Switch[]
  switchAmount: SwitchAmount[]
  stabs: Stab[]
  stabAmount: StabAmount[]
  keycaps: Keycap[]
  images: string[]
}

export interface UserBuildData {
  getUserBuilds: Build[]
}

export type BuildData = {
  getBuilds: Build[]
}