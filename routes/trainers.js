const router = require("express").Router();
const TrainerController = require("../controllers/trainer.js");

router.get("/", TrainerController.findAll);
router.get("/add", TrainerController.formAdd);
router.post("/add", TrainerController.create);

module.exports = router;