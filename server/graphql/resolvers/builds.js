const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const Build = require('../../models/Build');
const Inventory = require('../../models/inventory/Inventory');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {},
  Mutation: {
    addBuild: async (_, { buildInput }, context) => {
      const { username } = checkAuth(context);

      const name = buildInput.name;
      const description = buildInput.description;
      const switches = buildInput.switches.map(swit => swit.name);
      const keycaps = buildInput.keycaps.map(keycap => keycap.set);
      const stabs = buildInput.stabs.map(stab => stab.name);
      const images = buildInput.images.map(image => image.link);
      // const stabAmount = buildInput.stabs.map(stab => {
      //   const { id, twoU, sixU, six25U, sevenU } = stab;
      //   const amounts = (twoU + sixU + six25U + sevenU) * 2;
      //   return { id, twoU, sixU, six25U, sevenU, housings: amounts, stems: amounts};
      // });
      // const switchAmount = buildInput.switches.map(swit => {
      //   return {id: swit.name, amount: swit.amount}
      // });

      const newBuild = { username, name, description, switches, keycaps, stabs, images};
      const built = new Build(newBuild);
      await built.save();
      const builtPopulated = await Build.findById(built._id)
              .populate('Inventory.switches')
              .populate('Inventory.keycaps')
              .populate('Inventory.stabs');
      console.log(builtPopulated);
      return builtPopulated;
    },
  }
}