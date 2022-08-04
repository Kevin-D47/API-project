'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'wwww.house1.com/download.jpeg',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },
      {
        url: 'wwww.house2.com/download.jpeg',
        previewImage: false,
        spotId: null,
        reviewId: 2,
        userId: 2
      },
      {
        url: 'wwww.apartment1.com/download.jpeg',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
