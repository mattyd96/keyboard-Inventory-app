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
    login: async (_,{ username, password }) => {
      const {errors, valid, type} = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      // find user with email or username
      let user;

      if(type === 'email') {
        user = await User.findOne({ email: username });
      } else {
        user = await User.findOne({ username });
      }

      if(!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await user.validatePassword(password);

      if (!match) {
        errors.general = 'Wrong Credentials';
        throw new UserInputError('Wrong Credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    signup: async (_, {signupinput: { username, email, password}}) => {
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Make sure username doesn't already exist
      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }

      // Make sure email doesn't already exist
      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('There is already an account with this email', {
          errors: {
            email: 'There is already an account with this email'
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