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
        description: "This luxurious modern home located on right outside the city of Los Angeles is a perfect stay. The house accompanies up to four guests with three bedrooms and three baths. There is a large pool in the back surrounded by a expansive yard. This spot is perfect for someone looking for a luxury quit stay while being close to the city.",
        type:"House",
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
        description: "This fancy condo located in the heart of Atlanta provides accomedations for all. The condo can house up to two guest wit one bedroom and two baths. If your looking for a spot to stay while your in Atlanta this is perfect. Everthing is the city is only short distances away. Whether your here on business, any events, or just to explore the city this is your stay.",
        type:"Condo",
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
        description: "This is a small lofty apartment is a affordable and convenient spot if you every find yourself in New York. It houses one guests with one bedroom and two baths. This is perfect for any one you is traveling alone and needs a small accomdating spot to stay at.",
        type:"Apartment",
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
        description: "This beautiful lake house located right beside a large expansive lake in Colorado is perfect getaway into what nature has to offer. This spot can house upt to three guests with two bedrooms and two baths. This stay has many activities nature has to offer from fishing to hiking. Guaranteed you will find some peace in nature here.",
        type:"House",
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
        description: "This large beach house located on the shores of Miami is great spot for all who enjoy the beach. This house accomidates up to five guests with four bedroom and three baths. Just steps away from the house is an amazing private beach perfect for friends and family to enjoy.",
        type:"House",
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
        description: "This cozy cabin is perfect for winter lovers. This cabin can hold up to three guests with two bedrooms and two baths. Just miles away is a local ski resort and after a long day of snowbarding/skiing nothing like coming back to a warm cozy home.",
        type:"Cabin",
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
        description: "This modern secluded desert home is perfect for those looking for a all inclusive accomdating stay while being out in Las Vegas. The spot can house up to four guests with three bedrooms and three baths. This is perfect for those looking to adventure out into the desert while still being close to the city of Las Vegas.",
        type:"House",
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
        description: "This massive mansion is perfect for any one looking to hold a big event. The mansion can accompany up tp ten guests with eight bedroom and six baths. The mansion includes everything you can imagine with your own personal butler even.",
        type:"Mansion",
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
        description: "This large ranch house is what Texas is all about. Can house up tp six guests with five bedrooms and four baths. The ranch is perfect for anyone looking to expore the great outdoors of Texas. Looking to ride some horses there is cowboy ranch not to far away from the preperty as well.",
        type:"House",
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
        description: "This beautiful luxury condo is a perfect vaction spot for couples. This condo can house two guests with one bedroom and 2 baths. The condo has a accomidiating pool while not being too far away from the beach.",
        type:"Condo",
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
        description: "This charming home is a perfect stay for those looking to explore the city of country music. The home can have up to three guests with two bedroom and two baths. Right outside the lively city of you can find refugee here after a long night out exploring the amzing town of Nashville.",
        type:"House",
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
        description: "This unique house is located in the center of San Francisco. Can house up to four guests with three bedrooms and three baths. This stay combines the classic SF home with a modern twist and accomidiations. Not too far from the Golden State Bridge",
        type:"House",
        price: 610
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
