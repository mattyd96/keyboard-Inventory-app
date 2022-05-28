const { model, Schema } = require('mongoose');

//const { caseSchema, keycapSchema, switchSchema, stabSchema } = require('./inventory/PartSchemas');

const buildSchema = new Schema({
  username: { type: String, required: true},
  switchAmount: [{id: String, amount: Number}],
  stabAmount: [{
    id: String,
    housings: Number,
    stems: Number,
    sevenU: Number,
    sixU: Number,
    six25U: Number,
    twoU: Number
  }],
  case: {
    type: Schema.Types.ObjectId,
    ref: 'Inventory.cases'
  },
  switches: [{
    type: Schema.Types.ObjectId,
    ref: 'Inventory.switches'
  }],
  stabs: [{
    type: Schema.Types.ObjectId,
    ref: 'Inventory.stabs'
  }],
  keycaps: [{
    type: Schema.Types.ObjectId,
    ref: 'Inventory.keycaps'
  }],
  images: [String]
});

module.exports = model('Build', buildSchema);