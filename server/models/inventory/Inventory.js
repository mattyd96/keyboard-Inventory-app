const { model, Schema } = require('mongoose');
const { caseSchema, keycapSchema, switchSchema, springSchema, stabSchema, artisanSchema } = require('./PartSchemas');

const inventorySchema = new Schema({
  username: { type: String, required: true},
  cases: [caseSchema],
  switches: [switchSchema],
  springs: [springSchema],
  stabs: [stabSchema],
  keycaps: [keycapSchema],
  artisans: [artisanSchema]
});

module.exports = model('Inventory', inventorySchema);