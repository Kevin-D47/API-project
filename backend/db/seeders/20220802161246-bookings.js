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
        spotId: 2,
        startDate: new Date("2022-07-18"),
        endDate: new Date("2022-07-20")
      },
      {
        userId: 2,
        spotId: 3,
        startDate: new Date("2022-10-03"),
        endDate: new Date("2022-10-09")
      },
      {
        userId: 3,
        spotId: 4,
        startDate: new Date("2022-12-15"),
        endDate: new Date("2022-12-20"),
      },
      {
        userId: 4,
        spotId: 5,
        startDate: new Date("2022-6-09"),
        endDate: new Date("2022-6-13"),
      },
      {
        userId: 5,
        spotId: 6,
        startDate: new Date("2022-8-02"),
        endDate: new Date("2022-8-08"),
      },
      {
        userId: 6,
        spotId: 7,
        startDate: new Date("2022-11-25"),
        endDate: new Date("2022-11-30"),
      },
      {
        userId: 7,
        spotId: 8,
        startDate: new Date("2022-12-01"),
        endDate: new Date("2022-12-03"),
      },
      {
        userId: 8,
        spotId: 9,
        startDate: new Date("2022-7-10"),
        endDate: new Date("2022-7-12"),
      },
      {
        userId: 9,
        spotId: 10,
        startDate: new Date("2022-3-18"),
        endDate: new Date("2022-3-21"),
      },
      {
        userId: 10,
        spotId: 11,
        startDate: new Date("2022-9-14"),
        endDate: new Date("2022-9-19"),
      },
      {
        userId: 11,
        spotId: 12,
        startDate: new Date("2022-5-15"),
        endDate: new Date("2022-5-20"),
      },
      {
        userId: 12,
        spotId: 1,
        startDate: new Date("2022-10-06"),
        endDate: new Date("2022-10-10"),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});
  }
};
