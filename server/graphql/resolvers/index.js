//const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const inventoryResolvers = require('./inventory');
const { parseConstValue } = require('graphql');

module.exports = {
  //Post: {
    //likeCount: (parent) => parent.likes.length,
    //commentCount: (parent) => parent.comments.length
  //},

  Query: {
    ...inventoryResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...inventoryResolvers.Mutation,
    //...commentsResolvers.Mutation
  }
}