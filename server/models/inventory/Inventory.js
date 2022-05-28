const { model, Schema } = require('mongoose');
const { caseModel, keycapModel, switchModel, springModel, stabModel, artisanModel } = require('./PartModels');

const inventorySchema = new Schema({
  username: { type: String, required: true},
  cases: [{
    type: Schema.Types.ObjectId,
    ref: 'Case'
  }],
  switches: [{
    type: Schema.Types.ObjectId,
    ref: 'Switch'
  }],
  springs: [{
    type: Schema.Types.ObjectId,
    ref: 'Spring'
  }],
  stabs: [{
    type: Schema.Types.ObjectId,
    ref: 'Stab'
  }],
  keycaps: [{
    type: Schema.Types.ObjectId,
    ref: 'Keycap'
  }],
  artisans: [{
    type: Schema.Types.ObjectId,
    ref: 'Artisan'
  }]
});

module.exports = model('Inventory', inventorySchema);