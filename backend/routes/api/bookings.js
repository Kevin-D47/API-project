const express = require('express')
const { Booking, Spot, User, Review, Image, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.dataValues.id

    const allBooking = await Booking.findAll({
        where: { userId },
        include: [{model: Spot}]
    })
    console.log(userId)
    res.status(200)
    res.json({ allBooking })
})


module.exports = router;
