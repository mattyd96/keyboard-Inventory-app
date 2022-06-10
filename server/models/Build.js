const { model, Schema } = require('mongoose');

const buildSchema = new Schema({
  username: { type: String, required: true},
  name: String,
  description: String,
  switchAmount: [{id: String, amount: Number}],
  stabAmount: [{
    stabId: String,
    housings: Number,
    stems: Number,
    sevenU: Number,
    sixU: Number,
    six25U: Number,
    twoU: Number
  }],
  case: {
    type: Schema.Types.ObjectId,
    ref: 'Case'
  },
  switches: [{
    type: Schema.Types.ObjectId,
    ref: 'Switch'
  }],
  stabs: [{
    type: Schema.Types.ObjectId,
    ref: 'Stab'
  }],
  keycaps: [{
    type: Schema.Types.ObjectId,
    ref: 'Keycap'
  }],
  images: [String]
});

module.exports = model('Build', buildSchema);