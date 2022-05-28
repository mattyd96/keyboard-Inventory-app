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

export type Build = {
  id: string
  username: string
  name: string
  description: string
  case: Case
  switches: Switch[]
  stabs: Stab
  Keycaps: Keycap
  images: string[]
}

export type UserBuildData = {
  getUserBuilds: {
    builds: Build[]
  }
}

export type BuildData = {
  getBuilds: {
    builds: Build[]
  }
}