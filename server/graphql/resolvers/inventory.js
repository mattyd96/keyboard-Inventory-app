const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const Inventory = require('../../models/inventory/Inventory');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    getCases: async (_, {username}) => {
      const user = await User.findOne({username}).populate('inventory');
      return user.inventory.cases;
    }
  },

  Mutation: {
    addCase: async (_, { caseinput }, context) => {
      console.log('hi');
      const { username } = checkAuth(context);
      console.log(username);
      
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.cases.push(caseinput);
        console.log(inv.cases);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');

    }
  }
}