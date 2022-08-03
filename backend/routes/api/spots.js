const express = require('express')
const { Spot, User, Review, Image, sequelize } = require('../../db/models')
const router = express.Router();

// GET all Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                    'avgRating'
                ],
            ]
        },
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


// GET all Spots owned by the Current User
router.get('/current', async (req, res) => {
    let userId = req.user.dataValues.id
    const spots = await Spot.findAll({
        include: [
            { model: User, where: { id: userId } }
        ]
    })
    res.json({ spots })
})


// GET details of a Spot from an id
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
    res.json({ details })
})


// Create a Spot
router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    let userId = req.user.dataValues.id

    const newSpot = await Spot.create({
        ownerId: userId, address, city, state, country, lat, lng, name, description, price
    })
    res.json(newSpot)
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
        res.json({
            statusCode: 404,
            message: "Spot couldn't be found"
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


module.exports = router
