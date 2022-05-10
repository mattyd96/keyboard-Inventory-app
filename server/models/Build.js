const { model, Schema } = require('mongoose');

const buildSchema = new Schema({
  username: { type: String, required: true},
  case: [],
  switches: {}, //will have a switchSchema
  stabs: [], // will have a stab schema
  keycaps: {}, // will have a keycaps schema
});

module.exports = model('build', buildSchema);