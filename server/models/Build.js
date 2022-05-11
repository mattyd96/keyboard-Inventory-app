const { model, Schema } = require('mongoose');

const { caseSchema, keycapSchema, switchSchema, stabSchema } = require('./inventory/PartSchemas');

const buildSchema = new Schema({
  username: { type: String, required: true},
  case: caseSchema,
  switches: switchSchema, //will have a switchSchema
  stabs: stabSchema, // will have a stab schema
  keycaps: keycapSchema, // will have a keycaps schema
});

module.exports = model('Build', buildSchema);