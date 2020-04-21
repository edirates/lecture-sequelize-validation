const router = require("express").Router();
const GymController = require("../controllers/gym.js");

router.get("/", GymController.findAll);
router.get("/add", GymController.formAdd);
router.post("/add", GymController.create);

module.exports = router;