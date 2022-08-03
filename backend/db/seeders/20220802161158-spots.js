'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "456 Brave Street",
        city: "Atlanta",
        state: "Georgia",
        country: "United States of America",
        lat: 40.7645358,
        lng: -100.4730327,
        name: "Peach Condos",
        description: "High End Living",
        price: 200
      },
      {
        ownerId: 3,
        address: "Hello World Lane",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 55.7645358,
        lng: -92.4730327,
        name: "Big Apple Square",
        description: "Small Apartments",
        price: 303
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
