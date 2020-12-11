// import all models
const Order = require("./Order");
const User = require("./User");
const Vote = require("./Vote");
const Comment = require("./Comment");

// create associations
User.hasMany(Order, {
  foreignKey: "user_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.belongsToMany(Order, {
  through: Vote,
  as: "voted_orders",

  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Order.belongsToMany(User, {
  through: Vote,
  as: "voted_orders",
  foreignKey: "order_id",
  onDelete: "SET NULL",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Vote.belongsTo(Order, {
  foreignKey: "order_id",
  onDelete: "SET NULL",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Order.hasMany(Vote, {
  foreignKey: "order_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Order, {
  foreignKey: "order_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Order.hasMany(Comment, {
  foreignKey: "order_id",
});

module.exports = { User, Order, Vote, Comment };
