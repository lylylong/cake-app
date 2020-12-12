// import models
const Flavour = require('./Flavour');
const Category = require('./Category');
const Tag = require('./Tag');
const FlavourTag = require('./FlavourTag');

// Flavours belongsTo Category
Flavour.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Flavours
Category.hasMany(Flavours, {
  foreignKey: 'category_id',
});

// Flavours belongToMany Tags (through FlavourTag)
Flavour.belongsToMany(Tag, {
  through: FlavourTag,
  // as: 'flavour_tags',
  foreignKey: 'flavour_id',
});

// Tags belongToMany Flavours (through FlavourTag)
Tag.belongsToMany(Flavour, {
  through: FlavourTag,
  // as: 'flavour_tags',
  foreignKey: 'tag_id',
});

module.exports = {
  Flavour,
  Category,
  Tag,
  FlavourTag,
};
