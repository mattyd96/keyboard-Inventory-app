const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  permissions: [],
  builds: [{
    type: Schema.Types.ObjectId,
    ref: 'build'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }],
  inventory: {
    type: Schema.Types.ObjectId,
    ref: 'inventory',
  },
  createdAt: Date
});

module.exports = model('User', userSchema);