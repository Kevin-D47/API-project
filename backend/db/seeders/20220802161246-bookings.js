'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date("2022-07-19"),
        enddate: new Date("2022-07-20")
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date("2022-10-03"),
        enddate: new Date("2022-10-09")
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date("2022-12-22"),
        enddate: new Date("2022-12-20"),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
