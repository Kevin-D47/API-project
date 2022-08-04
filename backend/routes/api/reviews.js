const express = require('express')
const { Review, Spot, User, Image, Booking, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth,  async (req, res) => {
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



// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {})



// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { review, stars } = req.body

    const editReview = await Review.findByPk(reviewId)

    if (editReview) {
        editReview.set({ review, stars });
        await editReview.save()
        res.json(editReview)
    } else if (stars < 1 || stars > 5) {
        res.status(400)
        res.json({
            message: "Validation error",
            statusCode: 400,
            errors: {
              review: "Review text is required",
              stars: "Stars must be an integer from 1 to 5",
            }
          })
    } else {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
          }
        )
    }
})



// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {})



module.exports = router
