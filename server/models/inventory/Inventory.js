const { model, Schema } = require('mongoose');
const { caseSchema, keycapSchema, switchSchema, springSchema, stabSchema } = require('./PartSchemas');

const inventorySchema = new Schema({
  username: { type: String, required: true},
  cases: [caseSchema],
  stockSwitches: [switchSchema],
  modSwitches: [switchSchema],
  springs: [springSchema],
  stabs: [stabSchema],
  keycaps: [keycapSchema],
});

module.exports = model('Inventory', inventorySchema);