const { UserInputError, AuthenticationError } = require('apollo-server');
const { ref, deleteObject } =  require('firebase/storage');
const { storage } = require('../../util/firebase');

const User = require('../../models/User');
const Build = require('../../models/Build');
const Inventory = require('../../models/inventory/Inventory');
const checkAuth = require('../../util/checkAuth');

const getBuild = async id => {
  const build = await Build.findById(id)
    .populate('case')
    .populate('switches')
    .populate('keycaps')
    .populate('stabs');

    return build;
};

const deleteImages = async (images) => {
  await Promise.all(
    images.map(async img => {
      const imgRef = ref(storage, img);
      await deleteObject(imgRef);
    })
  )
};

module.exports = {
  Query: {
    getUserBuilds: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const builds = await Build.find({username})
      .populate('case')
      .populate('switches')
      .populate('keycaps')
      .populate('stabs');

      return builds;
    },

    getBuild: async (_, { id }, context) => {
      const builds = await Build.findById(id)
      .populate('case')
      .populate('switches')
      .populate('keycaps')
      .populate('stabs');

      return builds;
    },
  },

  Mutation: {
    addBuild: async (_, { buildInput }, context) => {
      const { username } = checkAuth(context);
      console.log(buildInput.images);
      const name = buildInput.name;
      const description = buildInput.description;
      const cas = buildInput.case;
      const switches = buildInput.switches.map(swit => swit.name);
      const keycaps = buildInput.keycaps.map(keycap => keycap.set);
      const stabs = buildInput.stabs.map(stab => stab.name);
      // const stabAmount = buildInput.stabs.map(stab => {
      //   const { id, twoU, sixU, six25U, sevenU } = stab;
      //   const amounts = (twoU + sixU + six25U + sevenU) * 2;
      //   return { id, twoU, sixU, six25U, sevenU, housings: amounts, stems: amounts};
      // });
      // const switchAmount = buildInput.switches.map(swit => {
      //   return {id: swit.name, amount: swit.amount}
      // });

      const newBuild = { username, name, description, case: cas, switches, keycaps, stabs, images: buildInput.images};
      const built = new Build(newBuild);
      await built.save();
      const populatedBuild = await getBuild(built._id);
      console.log(populatedBuild);
      return populatedBuild;
    },

    updateBuild: async (_, { id, buildInput }, context) => {
      const { username } = checkAuth(context);

      const name = buildInput.name;
      const description = buildInput.description;
      const cas = buildInput.case;
      const switches = buildInput.switches.map(swit => swit.name);
      const keycaps = buildInput.keycaps.map(keycap => keycap.set);
      const stabs = buildInput.stabs.map(stab => stab.name);
      // const stabAmount = buildInput.stabs.map(stab => {
      //   const { id, twoU, sixU, six25U, sevenU } = stab;
      //   const amounts = (twoU + sixU + six25U + sevenU) * 2;
      //   return { id, twoU, sixU, six25U, sevenU, housings: amounts, stems: amounts};
      // });
      // const switchAmount = buildInput.switches.map(swit => {
      //   return {id: swit.name, amount: swit.amount}
      // });

      const newBuild = { username, name, description, case: cas, switches, keycaps, stabs, images: buildInput.images};
      await Build.findByIdAndUpdate(id, newBuild);
      const populatedBuild = await getBuild(id);
      console.log(populatedBuild);
      return populatedBuild;
    },

    deleteBuild: async (_, { id }, context) => {
      const { username } = checkAuth(context);
      const build = await Build.findById(id);
      await deleteImages(build.images);
      await Build.deleteOne({_id: id});
      return id;
    },
  }
}