const { Schema } = require('mongoose');

const caseSchema = new Schema({
  name: { type: String, required: true},
  creator: String,
  color: String,
  layout: String,
  caseMaterial: String,
  weightMaterial: String,
  weight: String,
  weightUnits: String,
  built: Boolean
});

const keycapSchema = new Schema({
  name: String,
  manufacturer: String,
  material: String,
  kits: [{name: String, amount: Number}],
});

const springSchema = new Schema({
  name: String,
  type: String,
  weight: String,
  length: String,
  lube: String,
  amount: Number
});

const switchSchema = new Schema({
  name: String,
  stock: Boolean,
  films: String,
  lube: String,
  springs: springSchema,
  top: String,
  bottom: String,
  amount: Number
});


const stabSchema = new Schema({
  name: String,
  manufacturer: String,
  wires: {twoU: Number, six25U: Number, sevenU: Number},
  housings: Number,
  stem: Number,
});

const artisanSchema = new Schema({
  name: String,
  maker: String,
  sculpt: String,
  colorway: String,
  totalMade: Number,
  owned: Number,
});


module.exports = { caseSchema, keycapSchema, switchSchema, springSchema, stabSchema, artisanSchema };