const User = require('../../models/User');

module.export = {
  Query: {
    getCases: async (_, {username}) => {
      const user = await User.findOne({username}).populate('inventory');
      return user.inventory.cases;
    }
  }
}