const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const { caseModel, keycapModel, switchModel, springModel, stabModel, artisanModel } = require('../../models/inventory/PartModels');
const Inventory = require('../../models/inventory/Inventory');
const checkAuth = require('../../util/checkAuth');

// helper to populate inventory model
const getInventory = async (username) => {
  const inv = await Inventory.findOne({username})
    .populate('cases')
    .populate('switches')
    .populate('springs')
    .populate('stabs')
    .populate('keycaps')
    .populate('artisans');

  return inv;
};

module.exports = {
  Query: {
    // get inventory with all section populated
    getInventory: async (_, args, context) => {
      const { username } = checkAuth(context);
      const inv = await getInventory(username);
      return inv;
    },
  },

  Mutation: {
    // add a case to a users Inventory
    addCase: async (_, { caseinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      // modify case input for db from input
      caseinput.plates = caseinput.plates.map(plate => {return {type: plate, used: false}});
      
      if(inv) {
        // create new case and save
        const cas = new caseModel(caseinput);
        cas.save();

        // add to user inventory
        inv.cases.push(cas._id);
        await inv.save();

        // return populated inventory
        const populatedInv = await getInventory(username);
        return populatedInv;
      } else throw new UserInputError('Something went wrong updating');

    },

    deleteCase: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        // delete case 
        await caseModel.deleteOne({_id: id});

        // remove from inventory
        inv.cases = inv.cases.filter((item) => item != id);
        await inv.save();

        // return populated inventory
        const populatedInv = await getInventory(username);
        return populatedInv;

      } else throw new UserInputError('Something went wrong deleting');
    },

    updateCase: async (_, { id, caseinput }, context) => {
      const { username } = checkAuth(context);

      // modify plate input to suite db data structure
      caseinput.plates = caseinput.plates.map(plate => {return {type: plate, used: false}});

      // update case
      await caseModel.updateOne({_id: id}, caseinput);

      // return populated Inventory
      const populatedInv = await getInventory(username);
      return populatedInv;
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
        inv.stabs = inv.stabs.filter((item) => item._id != id);
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

    addArtisan: async (_, { artisaninput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      
      if(inv) {
        inv.artisans.push(artisaninput);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');
    },

    deleteArtisan: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.artisans = inv.artisans.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateArtisan: async (_, { id, artisaninput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.artisans.id(id);
      item.set(artisaninput);
      await inv.save();
      return inv;
    },

    addKeycap: async (_, { keycapinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      keycapinput.kits = keycapinput.kits.map(kit => {
        return { name: kit.name, amount: kit.amount }
      });
      
      if(inv) {
        inv.keycaps.push(keycapinput);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');
    },

    deleteKeycap: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.keycaps = inv.keycaps.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateKeycap: async (_, { id, keycapinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.keycaps.id(id);

      item.set(keycapinput);
      await inv.save();
      return inv;
    },

    addSwitch: async (_, { switchinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      
      if(inv) {
        inv.switches.push(switchinput);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong updating');
    },

    deleteSwitch: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});

      if(inv) {
        inv.switches = inv.switches.filter((item) => item._id != id);
        await inv.save();
        return inv;
      } else throw new UserInputError('Something went wrong deleting');
    },

    updateSwitch: async (_, { id, switchinput }, context) => {
      const { username } = checkAuth(context);
      const inv = await Inventory.findOne({username});
      const item = inv.switches.id(id);

      item.set(switchinput);
      await inv.save();
      return inv;
    },
  }
}