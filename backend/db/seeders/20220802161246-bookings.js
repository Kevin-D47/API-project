'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date("2022-07-18"),
        endDate: new Date("2022-07-20")
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date("2022-10-03"),
        endDate: new Date("2022-10-09")
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date("2022-12-15"),
        endDate: new Date("2022-12-20"),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};
