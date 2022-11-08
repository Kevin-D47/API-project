'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Images';
    await queryInterface.bulkInsert(options, [
      {
        url: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg',
        previewImage: true,
        spotId: 1,
        reviewId: null,
        userId: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1573958463969-876edfe174df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
        previewImage: true,
        spotId: 2,
        reviewId: null,
        userId: 2
      },
      {
        url: 'https://assets3.thrillist.com/v1/image/3081755/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70',
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
        url: 'https://www.jetsetter.com//uploads/sites/7/2018/04/NQhHXy4n-1380x1035.jpeg',
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
      {
        url: 'https://farmerpaynearchitects.com/wp-content/uploads/2022/04/texas-ranch-image-02.jpg',
        previewImage: true,
        spotId: 9,
        reviewId: null,
        userId: 9
      },
      {
        url: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        previewImage: true,
        spotId: 10,
        reviewId: null,
        userId: 10
      },
      {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        previewImage: true,
        spotId: 11,
        reviewId: null,
        userId: 11
      },
      {
        url: 'https://s.wsj.net/public/resources/images/B3-CC754_russia_M_20181022105812.jpg',
        previewImage: true,
        spotId: 12,
        reviewId: null,
        userId: 12
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    await queryInterface.bulkDelete(options, null, {});
  }
};
