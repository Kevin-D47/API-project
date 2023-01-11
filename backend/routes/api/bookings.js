const express = require('express')
const { Booking, Spot, User, Review, Image, sequelize } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require("sequelize");
const router = express.Router();



// // Get all of the Current User's Bookings
// router.get('/current', requireAuth, restoreUser, async (req, res) => {
//   let userId = req.user.dataValues.id

//   const allBooking = await Booking.findAll({
//     where: { userId },
//     include: [{ model: Spot,  attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"] }]
//   })

//   // Successful Response
//   res.status(200)
//   res.json({ allBooking })
// })

router.get("/current", requireAuth, restoreUser, async (req, res) => {
  const user = req.user.id;
  const bookings = await Booking.findAll({
    where: { userId: user },
  });
  for (let book of bookings) {
    const spot = await Spot.findOne({
      where: { id: book.spotId },
      attributes: [ "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
    });
    const image = await Image.findOne({
      where: { previewImage: true, spotId: book.spotId },
      attributes: ["url"],
    });
    spot.dataValues.previewImage = image.url;
    book.dataValues.Spot = spot;
  }

  res.status(200);
  res.json({ Bookings: bookings });
});



// Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, async (req, res) => {
  const { userId, startDate, endDate } = req.body

  const bookingId = req.params.bookingId
  const editBooking = await Booking.findByPk(bookingId)

  // Error response: Couldn't find a Booking with the specified id
  if (!editBooking) {
    res.status(404)
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  // Error response: Body validation errors
  if (startDate > endDate) {
    res.status(400)
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  // Error response: Can't edit a booking that's past the end date
  let now = new Date().getTime()
  let bookingDate = new Date(editBooking.endDate).getTime()

  if (now > bookingDate) {
    res.status(403)
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  // Error response: Booking conflict
  const spotId = editBooking.spotId

  const currentBookings = await Booking.findAll({
    where: {
      spotId: !spotId,
      [Op.and]: [
        { endDate: { [Op.gte]: startDate } },
        { startDate: { [Op.lte]: endDate } },
      ],
    },
  });

  if (currentBookings.length) {
    res.status(403)
    res.json({
      message: "Sorry, the specified date is already booked on another spot",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  // Return edit booking
  if (userId == req.user.id) {
    editBooking.startDate = startDate,
    editBooking.endDate = endDate,

    await editBooking.save()

    // Successful Response
    res.status(200)
    res.json(editBooking)
  } else {
    res.status(403)
    res.json({
      message: "Sorry, you do not own this booking",
      statusCode: 403,
      editBooking,
      userId
    })
  }
})


// Delete a Booking
router.delete("/:bookingId", requireAuth, restoreUser, async (req, res) => {
  const { bookingId } = req.params;
  const findBooking = await Booking.findByPk(bookingId);

  // Error response: Bookings that have been started can't be deleted
  let now = Date.now()
  let bookingDate = new Date(bookingId.startDate)

  if (now > bookingDate) {
    res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  // Error response: Couldn't find a Booking with the specified id
  if (!findBooking) {
    res.status(404);
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  // Delete booking
  await findBooking.destroy();

  // Successful Response
  res.status(200)
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});


module.exports = router;
