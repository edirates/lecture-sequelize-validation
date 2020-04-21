const { Gym, Trainer, Manager } = require("../models");

class GymController {
    static findAll (req, res) {
        Gym.findAll({
            include: [ Trainer, Manager ]
        })
        .then((gyms) => {
            // res.send(gyms);
            const message = req.app.locals.message || null;
            const error = req.app.locals.error || null;
            delete req.app.locals.message;
            delete req.app.locals.error;
            res.render("gyms", { gyms: gyms, message: message, error: error});
        })
        .catch((err) => {
            // res.send(err);
            res.render("gyms", { gyms: [], message: null, error: err});
        });
    }
    static formAdd (req, res) {
        const error = req.app.locals.error || null;
        delete req.app.locals.error;
        res.render("gyms-add", { error: error });
    }
    static create (req, res) {
        const { name } = req.body;
        Gym.create({
            name: name
        })
        .then((newGym) => {
            // res.send(newGym);
            req.app.locals.message = `Success adding new gym with name ${newGym.name}.`;
            res.redirect("/gyms");
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
            res.redirect("/gyms/add");
        });
    }
}

module.exports = GymController;