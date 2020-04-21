const router = require("express").Router();
const ManagerController = require("../controllers/manager.js");

router.get("/", ManagerController.findAll);
router.get("/add", ManagerController.formAdd);
router.post("/add", ManagerController.create);

module.exports = router;