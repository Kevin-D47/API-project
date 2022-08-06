const express = require('express')
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();



// Get all Spots owned by the Current User
router.get('/current', requireAuth, restoreUser, async (req, res) => {
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
        // needed in order to return all spots
        group: ['Spot.id'],
        raw: true
    })

    // Include previewImage
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

    // Successful Response
    res.status(200)
    res.json({ allSpots })
})



// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)

    // Error response: Couldn't find a Spot with the specified id
    if (!spot) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    const numReviews = await Review.count({
        where: { spotId: spotId }
    })

    const rating = await Review.findOne({
        attributes: [[sequelize.fn("avg", sequelize.col('stars')), "avgStarRating"]],
        where: { spotId: spotId },
        raw: true
    })

    const images = await Image.findAll({
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        where: { spotId: spotId }
    })

    const details = spot.toJSON()

    details.numReviews = numReviews
    details.avgStarRating = rating.avgStarRating
    details.Images = images
    details.Owner = owner

    // Successful Response
    res.status(200)
    res.json(details)
})



// Create a Spot
router.post('/', requireAuth, restoreUser, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    let userId = req.user.dataValues.id

    const newSpot = await Spot.create({
        ownerId: userId, address, city, state, country, lat, lng, name, description, price
    })

    // Successful Response
    if (newSpot) {
        res.status(200)
        res.json(newSpot)
    } else {
        // Error Response: Body validation error
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
router.post('/:spotId/images', requireAuth, restoreUser, async (req, res) => {
    const spotId = req.params = req.params.spotId;

    const { user } = req
    const { url, previewImage } = req.body

    const findSpot = await Spot.findByPk(spotId)

    // Error response: Couldn't find a Spot with the specified id
    if (!findSpot) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    // Create Image
    const image = await Image.create({ url, previewImage, spotId, userId: user.id })

    // Define an object to make association
    const object = {}
    object.id = image.id
    object.imageableId = parseInt(spotId)
    object.url = image.url

    // Successful Response
    res.status(200)
    res.json(object)

})



// Edit a Spot
router.put('/:spotId', requireAuth, restoreUser, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const { spotId } = req.params
    const editSpot = await Spot.findByPk(spotId)

    // Error Response: Body validation error defined in ../db/models/spot.js

    // Error response: Couldn't find a Spot with the specified id
    if (!editSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // Edit spot
    if (editSpot) {
        editSpot.set({ address, city, state, country, lat, lng, name, description, price });

        await editSpot.save()

        // Successful Response
        res.status(200)
        res.json(editSpot)
    }
})



//Delete a Spot
router.delete("/:spotId", requireAuth, restoreUser, async (req, res) => {
    const { spotId } = req.params;
    const findSpot = await Spot.findByPk(spotId);

    // Error response: Couldn't find a Spot with the specified id
    if (!findSpot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }

    // Delete spot
    await findSpot.destroy();

    // Successful Response
    res.status(200)
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

    // Error response: Couldn't find a Spot with the specified id
    if (!findSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    // Successful Response
    if (findSpot) {
        res.status(200)
        res.json({ allReviews })
    }

})



// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;

    const { spotId } = req.params
    const findSpot = await Spot.findByPk(spotId)

    const { user } = req
    const userId = user.dataValues.id

    // find all reviews for a Spot
    const allReviews = await Review.findAll({
        include: [
            { model: Spot, where: { id: spotId } }
        ]
    })

    if (findSpot) {
        // check if a review for a spot has already been made by userId
        let reviewed;
        for (let reviews of allReviews) {
            if (reviews.userId === userId) {
                reviewed = true
            }
        }
        if (reviewed) {
            // Error response: Review from the current user already exists for the Spot
            res.status(403)
            res.json({
                message: "User already has a review for this spot",
                statusCode: 403
            })
        } else if (stars < 1 || stars > 5) {
            //* Error Response: Body validation errors
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
            // Create review
            const spotReview = await Review.create({
                userId, spotId, review, stars
            })
            // Successful Response
            res.status(200)
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

    const currentUserId = req.user.id

    const owner = await Spot.findOne({
        where: { id: spotId }
    })

    const allBookings = await Booking.findAll({
        where: { spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })

    // Error response: Couldn't find a Spot with the specified id
    if (!findSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (findSpot) {
        // Successful Response: If you ARE NOT the owner of the spot.
        if (owner.id === currentUserId) {
            res.status(200)
            res.json({ allBookings })
        } else {
            // Successful Response: If you ARE the owner of the spot.
            const allBookings = await Booking.findAll({
                where: { spotId },
                attributes: ['spotId', 'startDate', 'endDate']
            })
            // Successful Response
            res.status(200)
            res.json({ allBookings })
        }
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
        //  check if a booking for a spot has already been made by userId
        let booked;
        for (let booking of allBoookings) {
            if (booking.userId === userId) {
                booked = true
            }
        }

        if (booked) {
            //* Error response: Booking already exists for the Spot
            res.status(403)
            res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        } else if (endDate < startDate) {
            //* Error Booking: Body validation errors
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
            // Successful Response
            res.status(200)
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



// Return spots filtered by query parameters.
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let where = {};

    if (minLat) {
        where.minLat = minLat
    }
    if (maxLat) {
        where.maxLat = maxLat
    }
    if (minLng) {
        where.minLng = minLng
    }
    if (maxLng) {
        where.maxLng = maxLng
    }
    if (minPrice) {
        where.minPrice = minPrice
    }
    if (maxPrice) {
        where.maxPrice = maxPrice
    }

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || !page) page = 1;
    if (Number.isNaN(size) || !size) size = 20;

    if ((page < 1 || page > 10) || (size < 1 || size > 20)) {
        res.status(400)
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 1",
                size: "Size must be greater than or equal to 1"
            }
        })
    }

    // Return data for GET all Spots if there is a pagination
    if (req.query.page && req.query.size) {

        const allSpots = await Spot.findAll({
            where: { ...where },

            limit: size,
            offset: size * (page - 1),

            group: ['Spot.id'],
            raw: true,
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

            if (image) {
                spot.previewImage = image.url
            } else {
                spot.previewImage = null
            }
        }

        // Successful Response
        res.status(200)
        res.json({ allSpots, page, size });

    } else {
        // Return data for GET all Spots if there is  NO pagination

        // Get spot all
        const allSpots = await Spot.findAll({
            attributes: {
                include: [
                    [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]  //AvgRating Column Added using sequelize functions in the stars column
                ]
            },

            include: [
                { model: Review, attributes: [] }  //Provide access to Review model from associations
            ],

            group: ['Spot.id'],   // needed in order to return all spots
            raw: true   //method to convert out from findByPk && findOne into raw data aka JS object... otherise data will resemble console.log(req)
        })

        // Associate previewImage with Spots
        // Iterate through each spot in allSpots variable
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
            // if image exists, set the url of the image equal to the value of previewImage
            if (image) {
                spot.previewImage = image.url
            } else {
                spot.previewImage = null
            }
        }

        // Successful Response
        res.status(200)
        res.json({ allSpots })
    }
})


module.exports = router
