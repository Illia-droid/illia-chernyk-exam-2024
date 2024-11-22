'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversation',
        sourceKey: 'id',
      });
      
    }
  }
  Message.init(
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      conversation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      timestamps: true,
    }
  );
  return Message;
};
