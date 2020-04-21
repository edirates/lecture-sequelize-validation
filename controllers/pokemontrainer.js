const { Pokemon, Trainer, PokemonTrainer } = require("../models");

class PokemonTrainerController {
    static findAll (req, res) {
        PokemonTrainer.findAll({
            include: [ Pokemon, Trainer ]
        })
        .then((pokemonTrainers) => {
            // res.send(pokemonTrainers);
            const message = req.app.locals.message || null;
            const error = req.app.locals.error || null;
            delete req.app.locals.message;
            delete req.app.locals.error;
            res.render("pokemontrainers", { pokemonTrainers: pokemonTrainers, message: message, error: error});
        })
        .catch((err) => {
            // res.send(err);
            res.render("pokemontrainers", { pokemonTrainers: [], message: null, error: err});
        });
    }
    static formAdd (req, res) {
        let dataPokemons = null;
        Pokemon.findAll()
        .then((pokemons) => {
            dataPokemons = pokemons;
            return Trainer.findAll();
        })
        .then((trainers) => {
            const error = req.app.locals.error || null;
            delete req.app.locals.error;
            res.render("pokemontrainers-add", { pokemons: dataPokemons, trainers: trainers, error: error });
        })
        .catch((err) => {
            // res.send(err);
            if(err.errors) {
                req.app.locals.error = err.errors.map((error) => {
                    return error.message;
                });
            } else {
                req.app.locals.error = err.parent.routine;
            }
            res.redirect("/pokemontrainers/add");
        });
    }
    static create (req, res) {
        const { PokemonId, TrainerId } = req.body;
        PokemonTrainer.create({
            PokemonId: PokemonId,
            TrainerId: TrainerId
        })
        .then((newPokemonTrainer) => {
            // res.send(newPokemonTrainer);
            req.app.locals.message = `Success adding new pokemon trainer.`;
            res.redirect("/pokemontrainers");
        })
        .catch((err) => {
            // res.send(err);
            if(err.errors) {
                req.app.locals.error = err.errors.map((error) => {
                    return error.message;
                });
            } else {
                req.app.locals.error = err.parent.routine;
            }
            res.redirect("/pokemontrainers/add");
        });
    }
}

module.exports = PokemonTrainerController;