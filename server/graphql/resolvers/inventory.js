const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const checkAuth = require('../../util/checkAuth');

module.export = {
  Query: {
    getCases: async (_, {username}) => {
      const user = await User.findOne({username}).populate('inventory');
      return user.inventory.cases;
    }
  },

  Mutation: {
    addCase: async (_, args, context) => {
      const { username } = checkAuth(context);
      
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.cases.push(args);
        await inv.save();
        return inv.cases;
      } else throw new UserInputError('Something went wrong updating');
      
    }
  }
}