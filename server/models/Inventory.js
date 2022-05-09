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

const inventorySchema = new Schema({
  username: { type: String, required: true},
  cases: [caseSchema], // will have a case Schema
  switches: {}, // will have a switchSchema
  stabs: [], // will have a stab schema
  keycaps: {}, // will have a keycaps schema
});

module.exports = model('Inventory', inventorySchema);