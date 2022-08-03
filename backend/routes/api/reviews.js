const express = require('express')
const { Review, Spot, User, Image, Booking, sequelize } = require('../../db/models')
const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', async (req, res) => {
})


module.exports = router
