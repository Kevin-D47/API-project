const express = require('express')
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models')
const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                attributes: ['previewImage']
            }
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
    let spotId = req.params.spotId
    const details = await Spot.findByPk(spotId, {
        include: [
            {
                model: Image,
                attributes: ['id', 'url'] // Missing imageableId
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
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
router.post('/:spotId/images', async (req, res) => {})


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


module.exports = router
