const express = require('express')
const { Review, Spot, User, Image, Booking, sequelize } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
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
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    // DECONSTRUCT REVIEW ID
    const reviewId = req.params = req.params.reviewId;

    //DECONSTRUCT USER, URL & PREVIEW IMAGE
    const { user } = req
    const { url, previewImage } = req.body

    //IF USER DOESN'T EXIST - THROW ERROR
    if (!user) return res.status(401).json({ message: "You need to be logged in to make any changes", "statusCode": 401 })

    //CONFIRM IF REVIEW ID EXISTS
    const review = await Spot.findByPk(reviewId)

    //THROW ERROR IF REVIEW COULD NOT BE FOUND
    if (!review) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // CREATE IMAGE
    const image = await Image.create({ url, previewImage, reviewId, userId: user.id })

    //DEFINE AN OBJECT IN ORDER TO MAKE THE ASSOCIATION
    const object = {}
    object.id = image.id
    object.imageableId = parseInt(reviewId)
    object.url = image.url

    res.status(200)
    res.json(object)
})



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
router.delete("/:reviewId",  async (req, res) => {
    const { reviewId } = req.params;
    const findReview = await Review.findByPk(reviewId);

    if (!findReview) {
      res.status(404);
      return res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    await findReview.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

  });



module.exports = router
