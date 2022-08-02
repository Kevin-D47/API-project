const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot } = require('../../db/models')
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: [
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price'
        ]
    })
    return res.json(allSpots)
})

module.exports = router
