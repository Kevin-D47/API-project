'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg',
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
        url: 'https://images.unsplash.com/photo-1618990908950-fd1a23294d11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        previewImage: true,
        spotId: 3,
        reviewId: null,
        userId: 3
      },
      {
        url: 'https://images.unsplash.com/photo-1541420937988-702d78cb9fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        previewImage: true,
        spotId: 4,
        reviewId: null,
        userId: 4
      },
      {
        url: 'https://img.trackhs.com/x1080/https://track-pm.s3.amazonaws.com/parrishkauai/image/19bbe9eb-62ee-4ac4-81ac-356a166b712f',
        previewImage: true,
        spotId: 5,
        reviewId: null,
        userId: 5
      },
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        previewImage: true,
        spotId: 6,
        reviewId: null,
        userId: 6
      },
      {
        url: 'https://iconiclife.com/wp-content/uploads/2021/10/luxury-Phoenix-homes-by-architect-Eric-Peterson.jpg',
        previewImage: true,
        spotId: 7,
        reviewId: null,
        userId: 7
      },
      {
        url: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        previewImage: true,
        spotId: 8,
        reviewId: null,
        userId: 8
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
