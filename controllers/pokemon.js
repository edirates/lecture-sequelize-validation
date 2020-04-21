const { Pokemon, Trainer } = require("../models");

class PokemonController {
    static findAll (req, res) {
        Pokemon.findAll({
            include: [ Trainer ]
        })
        .then((pokemons) => {
            // res.send(pokemons);
            const message = req.app.locals.message || null;
            const error = req.app.locals.error || null;
            delete req.app.locals.message;
            delete req.app.locals.error;
            res.render("pokemons", { pokemons: pokemons, message: message, error: error});
        })
        .catch((err) => {
            // res.send(err);
            res.render("pokemons", { pokemons: [], message: null, error: err});
        });
    }
    static formAdd (req, res) {
        const error = req.app.locals.error || null;
        delete req.app.locals.error;
        res.render("pokemons-add", { error: error });
    }
    static create (req, res) {
        const { name, type, level, status } = req.body;
        Pokemon.create({
            name: name,
            type: type,
            level: level,
            status: status
        })
        .then((newPokemon) => {
            // res.send(newPokemon);
            req.app.locals.message = `Success adding new pokemon with name ${newPokemon.name}.`;
            res.redirect("/pokemons");
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
            res.redirect("/pokemons/add");
        });
    }
}

module.exports = PokemonController;