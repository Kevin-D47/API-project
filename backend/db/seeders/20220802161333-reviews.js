'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
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
        review: "This was an pretty ok spot!",
        stars: 3,
      },
      {
        userId: 8,
        spotId: 7,
        review: "This was an hot spot!",
        stars: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
