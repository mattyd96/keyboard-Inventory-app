const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');

const generateToken = user => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, process.env.SECRET_KEY , { expiresIn: '7d'} );
}

module.exports = {
  //Query: {},
  Mutation: {
    signup: async (_, {signupinput: { username, email, password}}) => {
      console.log("running");
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // TODO Make sure user doesn't already exist
      const user = await User.findOne({ username });
      console.log(user);
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}