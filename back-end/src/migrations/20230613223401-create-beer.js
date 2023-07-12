'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Beers', {
      beerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      beerName: {
          type: Sequelize.STRING(100),
          allowNull: false,
      },
      beerStyleId: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Beers');
  }
};
