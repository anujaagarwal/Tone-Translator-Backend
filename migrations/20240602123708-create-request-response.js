'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RequestResponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sampleContent: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      newDraft: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      translatedDraft: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sampleTone: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sampleSentiment: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RequestResponses');
  }
};