const router = require("express").Router();
const PokemonController = require("../controllers/pokemon.js");

router.get("/", PokemonController.findAll);
router.get("/add", PokemonController.formAdd);
router.post("/add", PokemonController.create);

module.exports = router;