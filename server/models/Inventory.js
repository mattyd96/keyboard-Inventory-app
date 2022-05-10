const { model, Schema } = require('mongoose');

const caseSchema = new Schema({
  name: { type: String, required: true},
  creator: String,
  color: String,
  layout: String,
  caseMaterial: String,
  weightMaterial: String,
  weight: String,
});

const switchSchema = newSchema({
  name: String,
  stock: Boolean,
  films: String,
  lube: String,
  springs: String,
  top: String,
  bottom: String,
  amount: Number
});

const keycapSchema = newSchema({
  name: String,
  manufacturer: String,
  material: String,
  kits: [{name: String, amount: Number}],
});

const stabSchema = newSchema({
  name: String,
  manufacturer: String,
  wires: {twoU: Number, six25U: Number, sevenU: Number},
  housings: Number,
  stem: Number,
});

const inventorySchema = new Schema({
  username: { type: String, required: true},
  cases: [caseSchema],
  stockSwitches: [switchSchema],
  modSwitches: [switchSchema],
  stabs: [stabSchema],
  keycaps: [keycapSchema],
});

module.exports = model('Inventory', inventorySchema);