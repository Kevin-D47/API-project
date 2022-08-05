const express = require('express')
const { Booking, Spot, User, Review, Image, sequelize } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require("sequelize");
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  let userId = req.user.dataValues.id

  const allBooking = await Booking.findAll({
    where: { userId },
    include: [{ model: Spot }]
  })
  res.status(200)
  res.json({ allBooking })
})


// // Edit a Booking
// router.put('/:bookingId', requireAuth, async (req, res) => {
//     const { bookingId } = req.params
//     const { startDate, endDate } = req.body

//     const editBooking = await Booking.findByPk(bookingId)

//     const allBookings = await Booking.findAll({
//         attributes: ['startDate', 'endDate']
//     })

//     editBooking.set({ startDate, endDate });
//     await editBooking.save()
//     res.json(editBooking)
// })


// // Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body

  const bookingId = req.params.bookingId
  const newBooking = await Booking.findByPk(bookingId)

  if (startDate > endDate) {
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

  if (!newBooking) {
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  }

  let now = Date.now()
  let bookingdate = new Date(newBooking.endDate)

  if (now > bookingdate) {
    res.json({
      message: "Past bookings can't be modified",
      statusCode: 403
    })
  }

  const spotId = newBooking.spotId

  const currentBookings = await Booking.findAll({
    where: {
      spotId: spotId,
      [Op.and]: [
        { endDate: { [Op.gte]: startDate } },
        { startDate: { [Op.lte]: endDate } },
      ],
    },
  });

  if (currentBookings.length) {
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    })
  }

  if (newBooking.userId === req.user.id) {
    newBooking.startDate = startDate,
      newBooking.endDate = endDate,

      await newBooking.save()
    res.json(newBooking)
  }
})


// Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const findBooking = await Booking.findByPk(bookingId);

  let now = Date.now()
  let bookingdate = new Date(bookingId.startDate)

  if (now > bookingdate) {
    res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403
    })
  }

  if (!findBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  await findBooking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});



module.exports = router;
