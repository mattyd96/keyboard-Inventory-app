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
      caseinput.plates = caseinput.plates.map(plate => {return {type: plate, used: false}});
      
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
      caseinput.plates = caseinput.plates.map(plate => {return {type: plate, used: false}});
      item.set(caseinput);
      await inv.save();
      return inv;
    },

    addSpring: async (_, { springinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      
      if(inv) {
        inv.springs.push(springinput);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');
    },

    deleteSpring: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.springs = inv.springs.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateSpring: async (_, { id, springinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.springs.id(id);
      item.set(springinput);
      await inv.save();
      return inv;
    },

    addStab: async (_, { stabinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      const newStab = {
        name: stabinput.name,
        wires: {
          twoU: stabinput.twoU,
          sixU: stabinput.sixU,
          six25U: stabinput.six25U,
          sevenU: stabinput.sevenU
        },
        housings: stabinput.housings,
        stems: stabinput.stems
      }
      
      if(inv) {
        inv.stabs.push(newStab);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');
    },

    deleteStab: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.stabs = inv.springs.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateStab: async (_, { id, stabinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.stabs.id(id);

      const updatedStab = {
        name: stabinput.name,
        wires: {
          twoU: stabinput.twoU,
          sixU: stabinput.sixU,
          six25U: stabinput.six25U,
          sevenU: stabinput.sevenU
        },
        housings: stabinput.housings,
        stems: stabinput.stems
      }

      item.set(updatedStab);
      await inv.save();
      return inv;
    },
  }
}