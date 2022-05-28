const { Schema } = require('mongoose');

const plateSchema = new Schema({
  type: String,
  used: Boolean
});

const caseSchema = new Schema({
  name: { type: String, required: true},
  creator: String,
  color: String,
  layout: String,
  caseMaterial: String,
  hasWeight: Boolean,
  weightMaterial: String,
  plates: [plateSchema],
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
  stock: String,
  films: String,
  lube: String,
  springs: springSchema,
  top: String,
  bottom: String,
  totalAmount: Number,
  availableAmount: Number
});


const stabSchema = new Schema({
  name: String,
  wires: {twoU: Number, sixU: Number, six25U: Number, sevenU: Number},
  housings: Number,
  stems: Number,
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