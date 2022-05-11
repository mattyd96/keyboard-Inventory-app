const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  profilePic: String,
  permissions: [String],
  builds: [{
    type: Schema.Types.ObjectId,
    ref: 'Build'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  inventory: {
    type: Schema.Types.ObjectId,
    ref: 'Inventory',
  },
  createdAt: Date
});

module.exports = model('User', userSchema);