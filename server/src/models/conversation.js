'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversation',
        targetKey: 'id',
      });
      Conversation.belongsToMany(models.Catalog, {
        through: 'conversations_to_catalogs',
        foreignKey: 'conversation_id',
      });
    }
  }
  Conversation.init(
    {
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        unique: true,
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        defaultValue: [false, false],
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      timestamps: true,
    }
  );
  return Conversation;
};
