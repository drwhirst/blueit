const express = require("express");
const router = express.Router();
const advertismentController = require("../controllers/advertismentController");

router.get('/advertisements', advertismentController.index);
router.get('/advertisements/new', advertismentController.new);
router.post('/advertisements/create', advertismentController.create);
router.get('/advertisements/:id', advertismentController.show);
router.get('/advertisements/:id/edit', advertismentController.edit);
router.post('/advertisements/:id/destroy', advertismentController.destroy);

module.exports = router;