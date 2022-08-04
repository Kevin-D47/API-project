const express = require('express')
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const router = express.Router();


// Get all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            { model: Review, attributes: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]] }, // preventing return of all spots
            { model: Image, attributes: ['url'] }
        ]
    })
    res.status(200)
    return res.json({ allSpots })
})


// Get all Spots owned by the Current User
router.get('/current', async (req, res) => {
    let userId = req.user.dataValues.id
    const spots = await Spot.findAll({
        include: [
            { model: User, where: { id: userId } }
        ]
    })
    res.status(200)
    res.json({ spots })
})


// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const details = await Spot.findByPk(spotId, {
        include: [
            { model: Image, attributes: ['id', 'url'] }, // Missing imageableId
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ]
    })
    if (details) {
        res.json({ details })
    } else {
        res.status(404)
        res.json({
            statusCode: 404,
            message: "Spot couldn't be found"

        })
    }

})


// Create a Spot
router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    let userId = req.user.dataValues.id

    const newSpot = await Spot.create({
        ownerId: userId, address, city, state, country, lat, lng, name, description, price
    })
    if (newSpot) {
        res.json(newSpot)
    } else {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }

})


// Edit a Spot
router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const editSpot = await Spot.findByPk(spotId)

    if (editSpot) {
        editSpot.set({ address, city, state, country, lat, lng, name, description, price });
        await editSpot.save()
        res.json(editSpot)
    } else {
        res.status(400)
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                address: "Street address is required",
                city: "City is required",
                state: "State is required",
                country: "Country is required",
                lat: "Latitude is not valid",
                lng: "Longitude is not valid",
                name: "Name must be less than 50 characters",
                description: "Description is required",
                price: "Price per day is required"
            }
        })
    }
})


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res, next) => {
    const spotId = req.params.spotId;

    const { url, previewImage } = req.body

    const dbImg = await Image.create(
        {
            url,
            previewImage,
            spotId
        }
    )

    //seeing if the spot Id exists (for the if statement)
    const findSpots = await Spot.findByPk(spotId)


    //finding all images once we create with function above
    const newImg = await Image.findAll({
        raw: true
    })

    let lastImg = newImg[newImg.length - 1]

    //create an object to send the response
    const object = {}
    object.id = lastImg.id
    object.imageableId = spotId
    object.url = lastImg.url

    if (findSpots) {
        res.status(200)
        res.json(object)
    } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }


})


// // Delete a Spot
// router.delete('/:spotId', async (req, res) => {
//     let spotId = req.user.dataValues.id

//     const deleteSpot = await Spot.findByPk(spotId)

//     await deleteSpot.destroy()

//     if (deleteSpot) {
//         res.json({
//             statusCode: 200,
//             message: "Successfully deleted"
//         })
//     } else {
//         res.json({
//             statusCode: 404,
//             message: "Spot couldn't be found"

//         })
//     }
// })


// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    let { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const allReviews = await Review.findAll({
        where: { spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Image }
        ]
    })

    if (findSpot) {
        res.status(200)
        res.json({ allReviews })
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body;

    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const { user } = req
    const userId = user.dataValues.id // id of current logged in user

    // find all reviews for a Spot
    const allReviews = await Review.findAll({
        include: [
            { model: Spot, where: { id: spotId } }
        ]
    })

    if (findSpot) {
        //* Error response: Review from the current user already exists for the Spot
        let reviewed;
        for (let reviews of allReviews) {
            if (reviews.userId === userId) {
                reviewed = true
            }
        }
        if (reviewed) {
            res.status(403)
            res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        } else if (stars < 1 || stars > 5) {  //* Error Response: Body validation errors
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
            // Create Review
            const spotReview = await Review.create({
                userId, spotId, review, stars
            })
            res.json(spotReview)
        }
    } else {
        //* Error response: Couldn't find a Spot with the specified id
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})




module.exports = router
