'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: "This was an horrible spot!",
        stars: 1,
      },
      {
        userId: 3,
        spotId: 2,
        review: "This was an nice spot!",
        stars: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
