const express = require("express");
const router = express.Router();
const topicsController = require("../controllers/topicController");

router.get("/topics", topicsController.index);
router.get("/topics/new", topicsController.new);
router.post("/topics/create", topicsController.create);
router.get("/topics/:id", topicsController.show);

module.exports = router;