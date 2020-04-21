const router = require("express").Router();
const PokemonTrainerController = require("../controllers/pokemontrainer.js");

router.get("/", PokemonTrainerController.findAll);
router.get("/add", PokemonTrainerController.formAdd);
router.post("/add", PokemonTrainerController.create);

module.exports = router;