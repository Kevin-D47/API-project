const express = require('express')
const { Review, Spot, User, Image, Booking, sequelize } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();


// Get all Reviews of the Current User
router.get('/current', requireAuth, restoreUser, async (req, res) => {
  let userId = req.user.dataValues.id

  const allReviews = await Review.findAll({
    include: [
      { model: User, where: { id: userId } },
      {
        model: Spot,
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
      },
      { model: Image, attributes: ['id', ['spotId', 'imageableId'], 'url'] }
    ]
  })

  // Successful Response
  if (allReviews) {
    res.status(200)
    res.json({ allReviews })
  }
})



// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, restoreUser, async (req, res) => {
  const { url, previewImage } = req.body

  const { user } = req

  const reviewId = req.params = req.params.reviewId;
  const review = await Spot.findByPk(reviewId)

  // Error response: Couldn't find a Review with the specified id
  if (!review) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  // Create image
  const image = await Image.create({ url, previewImage, reviewId, userId: user.id })

  // Define an object to make association
  const object = {}
  object.id = image.id
  object.imageableId = parseInt(reviewId)
  object.url = image.url

  // Successful Response
  res.status(200)
  res.json(object)
})



// Edit a Review
router.put('/:reviewId', requireAuth, restoreUser, async (req, res) => {
  const { reviewId } = req.params
  const { review, stars } = req.body

  const editReview = await Review.findByPk(reviewId)

  // Error Response: Body validation errors
  if (stars < 1 || stars > 5) {
    res.status(400)
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      }
    })
  }

  // Error response: Couldn't find a Review with the specified id
  if (!editReview){
    res.status(404)
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }

  // edit review
  if (editReview) {
    editReview.set({ review, stars });
    await editReview.save()

    // Successful Response
    res.status(200)
    res.json(editReview)
  }
})



// Delete a Review
router.delete("/:reviewId", requireAuth, restoreUser, async (req, res) => {
  const { reviewId } = req.params;
  const findReview = await Review.findByPk(reviewId);

  // Error response: Couldn't find a Review with the specified id
  if (!findReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  // Delete review
  await findReview.destroy();

  // Successful Response
  res.status(200)
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});


module.exports = router
