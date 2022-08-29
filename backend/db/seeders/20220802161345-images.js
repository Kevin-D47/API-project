'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },
      {
        url: 'https://blog-www.pods.com/wp-content/uploads/2020/11/resized_FI_SkyHouse-South-Midtown-Atlanta_fb.jpg',
        previewImage: true,
        spotId: 2,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://images1.apartments.com/i2/MtF6IDNpNGZ8GmP7SETNKuvnS1dqB2tmZBh7QFoStRk/117/shamco-apartments-535-w-162nd-st-new-york-ny-building-photo.jpg',
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
