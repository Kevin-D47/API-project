const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot } = require('../../db/models')
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({

    })
    return res.json(allSpots)
})

modules.exports = router
