const express = require('express')
const { Review, Spot, User, Image, Booking, sequelize } = require('../../db/models')
const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', async (req, res) => {
    let userId = req.user.dataValues.id

    const allReviews = await Review.findAll({
        include: [
            { model: User, where: { id: userId } },
            { model: Spot },
            { model: Image }
        ]
    })
    if (allReviews) {
        res.status(200)
        res.json({ allReviews })
    }
})

router.put('/:reviewId', async (req, res) => {
    
})

module.exports = router
