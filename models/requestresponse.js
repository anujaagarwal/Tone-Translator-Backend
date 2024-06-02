'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestResponses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RequestResponses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sampleContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    newDraft: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    translatedDraft: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sampleTone: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sampleSentiment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'RequestResponses',
  });
  return RequestResponses;
};