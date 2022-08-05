const express = require('express')
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



// //GET ALL SPOTS
//Part 1
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
            ]
        },
        include: [     //Provide access to Review model from associations
            { model: Review, attributes: [] }
        ],
        group: ['Spot.id'],
        raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
    })

    //Part 2 - Associate previewImage with Spots
    //Iterate through each spot in allSpots variable
    for (let spot of allSpots) {
        const image = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: spot.id
            },
            raw: true
        })

        //Determine if image contains a url link
        if (image) { // if image exists, set the url of the image equal to the value of previewImage
            spot.previewImage = image.url
        } else {
            spot.previewImage = null
        }
    }

    res.status(200)
    res.json({ allSpots })
})



// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    let userId = req.user.dataValues.id

    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
            ]
        },
        include: [
            { model: User, where: { id: userId }, as: 'Owner', attributes: [] },
            { model: Review, attributes: [] }
        ],
        group: ['Spot.id'],
        raw: true
    })
    for (let spot of allSpots) {
        const image = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: spot.id
            },
            raw: true
        })

        //Determine if image contains a url link
        if (image) { // if image exists, set the url of the image equal to the value of previewImage
            spot.previewImage = image.url
        } else {
            spot.previewImage = null
        }
    }
    res.status(200)
    res.json({ allSpots })
})



// // Get details of a Spot from an id
// router.get('/:spotId', async (req, res) => {
//     const { spotId } = req.params
//     const details = await Spot.findByPk(spotId, {
//         include: [
//             { model: Image, attributes: ['id', 'url'] }, // Missing imageableId
//             { model: User, attributes: ['id', 'firstName', 'lastName'] },
//         ]
//     })
//     if (details) {
//         res.json( details )
//     } else {
//         res.status(404)
//         res.json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//         })
//     }

// })

// //### GET DETAILS OF A SPOT FROM AN ID - DONE
//Part 1
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId

    const getSpots = await Spot.findByPk(spotId) //CONFIRM IF spotId EXISTS
    const reviews = await Review.count({ //DETERMINE REVIEW COUNT
        where: { spotId }
    })

    const spotDetails = await Spot.findOne({
        //Determine the key:value pair for numReviews
        attributes: {
            include: [
                [sequelize.fn("COUNT", reviews), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },

        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] },
        ],

        raw: true, //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
        where: { id: spotId }
    })

    //Part 2
    const imagesDetails = await Image.findAll({ //Set up a query for Images
        attributes: ['id', ['spotId', 'imageableId'], 'url'], //Extract attributes from Images and attach spotID ==> imageableID
        where: { spotId },
        raw: true //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
    })

    spotDetails.Images = imagesDetails

    let owner = {} //Include details of owner within spotDetails
    let user = await User.findByPk(spotId)
    let userData = user.dataValues
    owner.id = userData.id;

    // console.log(userdata)
    //id: 3,
    // firstName: 'firstuser3',
    // lastName: 'lastuser3',
    // username: 'FakeUser2'

    owner.firstName = userData.firstName
    owner.lastName = userData.lastName

    spotDetails.Owner = owner

    //ERROR HANDLER IF SPOT COULD NOT BE FOUND WITH THE SPECIFICED ID
    if (!getSpots) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json(spotDetails)
})


// Create a Spot
router.post('/', requireAuth, async (req, res) => {
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



// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res) => {
    const { url, previewImage } = req.body

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    const image = await Image.create({
        url,
        spotId: spot.dataValues.id,
        userId: req.user.id,
        previewImage
    })

    const addImage = {
        id: image.id,
        imageableId: image.spotId,
        url: image.url,
        previewImage
    }

    if (spot) {
        res.status(200)
        res.json(addImage)
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})



// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const editSpot = await Spot.findByPk(spotId)

    if (editSpot) {
        editSpot.set({ address, city, state, country, lat, lng, name, description, price });
        await editSpot.save()
        res.json(editSpot)
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})

// // Missing Error handler here: (But taken care of in with validators in model)
// res.status(400)
// res.json({
//     message: 'Validation Error',
//     statusCode: 400,
//     errors: {
//         address: "Street address is required",
//         city: "City is required",
//         state: "State is required",
//         country: "Country is required",
//         lat: "Latitude is not valid",
//         lng: "Longitude is not valid",
//         name: "Name must be less than 50 characters",
//         description: "Description is required",
//         price: "Price per day is required"
//     }
// })



//Delete a Spot
router.delete("/:spotId", async (req, res) => {
    const { spotId } = req.params;
    const findSpot = await Spot.findByPk(spotId);

    // console.log('current spot',findSpot)
    if (!findSpot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    await findSpot.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });

});


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



// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
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



// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const owner = await Spot.findAll({
        include: [
            { model: User, where: { id: spotId }, attributes: [] }
        ]
    })

    const allBookings = await Booking.findAll({
        where: { spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })

    if (findSpot) {
        res.status(200)
        res.json({ allBookings })
    } else {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }
})



// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body

    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const { user } = req
    const userId = user.dataValues.id

    const allBoookings = await Booking.findAll({
        include: [
            { model: Spot, where: { id: spotId } }
        ]
    })

    if (findSpot) {
        //* Error response: Booking already exists for the Spot
        let booked;
        for (let booking of allBoookings) {
            if (booking.userId === userId) {
                booked = true
            }
        }
        if (booked) {
            res.status(403)
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        } else if (endDate < startDate) {  //* Error Booking: Body validation errors
            res.status(400)
            res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    "endDate": "endDate cannot be on or before startDate"
                }
            })
        } else {
            // Create Booking
            const spotBooking = await Booking.create({
                spotId, userId, startDate, endDate
            })
            res.json(spotBooking)
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
