const express = require("express");
const router = express.Router();
const advertismentController = require("../controllers/advertismentController");

router.get('/advertisements', advertismentController.index);

module.exports = router;