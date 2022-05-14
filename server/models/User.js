const { model, Schema } = require('mongoose');
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  email: { type: String, required: true, unique: true},
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

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = model('User', userSchema);