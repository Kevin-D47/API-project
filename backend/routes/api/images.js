const express = require('express')
const { Image, Spot, Review, User, Booking, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();


// Delete an Image

router.delete("/:reviewId", requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const currentImage = await Image.findByPk(imageId);

    if (currentImage) {
        await currentImage.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 200,
        })

    } else {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404,
        });
    }

})


module.exports = router
