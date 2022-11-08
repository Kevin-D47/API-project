'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 5,
        review: "This was an awesome spot!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 3,
        review: "This was an horrible spot!",
        stars: 1,
      },
      {
        userId: 3,
        spotId: 2,
        review: "This was an nice spot!",
        stars: 4,
      },
      {
        userId: 4,
        spotId: 1,
        review: "This was an cool spot!",
        stars: 5,
      },
      {
        userId: 5,
        spotId: 4,
        review: "This was an amazing spot!",
        stars: 5,
      },
      {
        userId: 6,
        spotId: 8,
        review: "This was just wow!",
        stars: 5,
      },
      {
        userId: 7,
        spotId: 6,
        review: "This was an pretty okay spot!",
        stars: 3,
      },
      {
        userId: 8,
        spotId: 7,
        review: "This was an hot spot!",
        stars: 3,
      },
      {
        userId: 9,
        spotId: 12,
        review: "This was an neat spot!",
        stars: 4,
      },
      {
        userId: 10,
        spotId: 11,
        review: "This was an fair spot!",
        stars: 4,
      },
      {
        userId: 11,
        spotId: 10,
        review: "This was an decent spot!",
        stars: 3,
      },
      {
        userId: 12,
        spotId: 9,
        review: "This was an bad spot!",
        stars: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});

  }
};
