'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      previewImage: {
        type: Sequelize.STRING
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {model: 'Spots'}
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {model: 'Reviews'}
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {model: 'Users'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  }
};
