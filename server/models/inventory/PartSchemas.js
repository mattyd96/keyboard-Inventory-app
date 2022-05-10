const { Schema } = require('mongoose');

const caseSchema = new Schema({
  name: { type: String, required: true},
  creator: String,
  color: String,
  layout: String,
  caseMaterial: String,
  weightMaterial: String,
  weight: String,
});

const keycapSchema = newSchema({
  name: String,
  manufacturer: String,
  material: String,
  kits: [{name: String, amount: Number}],
});

const springSchema = newSchema({
  name: String,
  type: String,
  weight: String,
  length: String,
  lube: String,
  amount: Number
});

const switchSchema = newSchema({
  name: String,
  stock: Boolean,
  films: String,
  lube: String,
  springs: springSchema,
  top: String,
  bottom: String,
  amount: Number
});


const stabSchema = newSchema({
  name: String,
  manufacturer: String,
  wires: {twoU: Number, six25U: Number, sevenU: Number},
  housings: Number,
  stem: Number,
});


module.exports = { caseSchema, keycapSchema, switchSchema, springSchema, stabSchema };