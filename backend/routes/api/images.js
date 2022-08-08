const express = require('express')
const { Image, Spot, Review, User, Booking, sequelize } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();



// Delete an Image
router.delete("/:imageId", requireAuth, restoreUser, async (req, res) => {
    const { imageId } = req.params;
    const currentImage = await Image.findByPk(imageId);

    // Error response: Couldn't find an Image with the specified id
    if (!currentImage) {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }

    // Delete image
    await currentImage.destroy();

    // Successful Response
    res.status(200)
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

  });


module.exports = router
