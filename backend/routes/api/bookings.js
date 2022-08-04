const express = require('express')
const { Booking, Spot, User, Review, Image, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
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


// Edit a Booking
router.put('/:bookingId', async (req, res) => {
    const { bookingId } = req.params
    const { startDate, endDate } = req.body

    const editBooking = await Booking.findByPk(bookingId)

    const allBookings = await Booking.findAll({
        attributes: ['startDate', 'endDate']
    })

    // if (editBooking) {
    //     let booked;
    //     for (let booking of allBookings) {
    //         if (booking.startDate === editBooking.startDate) {
    //             booked = true
    //         }
    //     }
    //     if (booked) {
    //         res.json({
    //             message: "Sorry, this spot is already booked for the specified dates",
    //             statusCode: 403,
    //             errors: {
    //                 startDate: "Start date conflicts with an existing booking",
    //                 endDate: "End date conflicts with an existing booking"
    //             }
    //         })
    //     } else if (endDate < startDate) {
    //         res.status(400)
    //         res.json({
    //             message: "Validation error",
    //             statusCode: 400,
    //             errors: {
    //                 endDate: "endDate cannot come before startDate"
    //             }
    //         })
    //     } else if (endDate < new Date()) {
    //         res.json({
    //             message: "Past bookings can't be modified",
    //             statusCode: 403
    //         })
    //     } else {
    //         editBooking.set({ startDate, endDate });
    //         await editBooking.save()
    //         res.json(editBooking)
    //     }
    // } else {
    //     res.json({
    //         "message": "Booking couldn't be found",
    //         "statusCode": 404
    //     })
    // }
    editBooking.set({ startDate, endDate });
    await editBooking.save()
    res.json(editBooking)
})



module.exports = router;
