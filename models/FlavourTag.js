const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class FlavourTag extends Model {}

FlavourTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    flavour_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'flavour',
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'flavour_tag',
  }
);

module.exports = FlavourTag;
