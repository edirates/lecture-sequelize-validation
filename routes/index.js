const router = require("express").Router();
const gymsRouter = require("./gyms.js");
const managersRouter = require("./managers.js");
const trainersRouter = require("./trainers.js");
const pokemonsRouter = require("./pokemons.js");
const pokemonTrainersRouter = require("./pokemontrainers.js");

router.get("/", (req, res) => {
    res.render("home");
});

router.use("/gyms", gymsRouter);
router.use("/managers", managersRouter);
router.use("/trainers", trainersRouter);
router.use("/pokemons", pokemonsRouter);
router.use("/pokemontrainers", pokemonTrainersRouter);

module.exports = router;