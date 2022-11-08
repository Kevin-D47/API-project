'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "1234 Hollywood Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Modern Luxury Home",
        description: "4 guests - 3 bedroom - 3 bath",
        price: 890
      },
      {
        ownerId: 2,
        address: "4567 Brave Street",
        city: "Atlanta",
        state: "Georgia",
        country: "United States of America",
        lat: 40.7645358,
        lng: -100.4730327,
        name: "Fancy Condo",
        description: "2 guests - 1 bedroom - 2 bath",
        price: 560
      },
      {
        ownerId: 3,
        address: "8910 Apple Square",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 55.7645358,
        lng: -92.4730327,
        name: "Simple Apartment",
        description: "1 guests - 1 bedroom - 2 bath",
        price: 220
      },
      {
        ownerId: 4,
        address: "3600 Lake View",
        city: "Boulder",
        state: "Colorado",
        country: "United States of America",
        lat: 20.7645358,
        lng: -120.4730327,
        name: "Peaceful Lake House",
        description: "3 guests - 2 bedroom - 2 bath",
        price: 350
      },
      {
        ownerId: 5,
        address: "1111 Sandy Circle",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 40.7645358,
        lng: -100.4730327,
        name: "Beach Front Home",
        description: "5 guests - 4 bedroom - 3 bath",
        price: 425
      },
      {
        ownerId: 6,
        address: "1001 Snowy Street",
        city: "Helena",
        state: "Montana",
        country: "United States of America",
        lat: 70.7645358,
        lng: -65.4730327,
        name: "Cozy Cabin",
        description: "3 guests - 2 bedroom - 2 bath",
        price: 240
      },
      {
        ownerId: 7,
        address: "7772 Desert Corner",
        city: "Las Vegas",
        state: "Nevada",
        country: "United States of America",
        lat: 20.7645358,
        lng: -90.4730327,
        name: "Secluded Desert Home",
        description: "4 guests - 3 bedroom - 3 bath",
        price: 300
      },
      {
        ownerId: 8,
        address: "1800 Century Times",
        city: "Bellevue",
        state: "Washington",
        country: "United States of America",
        lat: 80.7645358,
        lng: -50.4730327,
        name: "Massive Mansion",
        description: "10 guests - 8 bedroom - 6 bath",
        price: 1200
      },
      {
        ownerId: 9,
        address: "3030 Long Horn Ranch",
        city: "Houston",
        state: "Texas",
        country: "United States of America",
        lat: 40.7645358,
        lng: -150.4730327,
        name: "Big Ranch House",
        description: "6 guests - 5 bedroom - 4 bath",
        price: 660
      },
      {
        ownerId: 10,
        address: "9260 Calm Street",
        city: "Myrtle Beach",
        state: "South Carolina",
        country: "United States of America",
        lat: 20.7645358,
        lng: -120.4730327,
        name: "Beautiful Condo",
        description: "2 guests - 1 bedroom - 2 bath",
        price: 520
      },
      {
        ownerId: 11,
        address: "8602 Country Road",
        city: "Nashville",
        state: "Tennessee",
        country: "United States of America",
        lat: 85.7645358,
        lng: -90.4730327,
        name: "Charming Modest Home",
        description: "3 guests - 2 bedroom - 2 bath",
        price: 290
      },
      {
        ownerId: 12,
        address: "4500 Hill Street",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 46.7645358,
        lng: -110.4730327,
        name: "Stylish Modern Home ",
        description: "4 guests - 3 bedroom - 3 bath",
        price: 610
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
