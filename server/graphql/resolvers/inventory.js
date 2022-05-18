const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const Inventory = require('../../models/inventory/Inventory');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    getInventory: async (_, args, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username})
      return inv;
    },
  },

  Mutation: {
    addCase: async (_, { caseinput }, context) => {
      const { username } = checkAuth(context);
      
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.cases.push(caseinput);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');

    },

    deleteCase: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.cases = inv.cases.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateCase: async (_, { id, caseinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.cases.id(id);
      item.set(caseinput);
      await inv.save();
      return inv;
    }
  }
}