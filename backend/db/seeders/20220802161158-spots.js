'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "1234 Hollywood Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Modern Luxury Home",
        description: "Aestheticlly Modern Luxury Stay",
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
        name: "Fancy Peach Condos",
        description: "High End Living",
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
        description: "Small Homey Spot",
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
        description: "Cozy Lake Front",
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
        description: "Calming Ocean Side Stay",
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
        description: "Warm Cozy Cabin",
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
        description: "Warming Getaway",
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
        description: "Extravagant Stay",
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
        description: "Big Open Ranch",
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
        name: "Beautiful Condos",
        description: "Beautiful Relaxing Stay",
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
        description: "Comfy Modest Stay",
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
        description: "Modern City Stay",
        price: 610
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
