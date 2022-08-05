const express = require('express')
const { Image, Spot, Review, User, Booking, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();


// Delete an Image
router.delete('/:imageId', requireAuth, async (req, res) => {})


module.exports = router
