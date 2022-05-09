const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  permissions: [],
  builds: [],
  posts: [],
  stock: {},
  createdAt: Date
});

module.exports = model('User', userSchema);