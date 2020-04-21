const { Trainer, Gym, Pokemon } = require("../models");

class TrainerController {
    static findAll (req, res) {
        Trainer.findAll({
            include: [ Gym, Pokemon ]
        })
        .then((trainers) => {
            for (let i = 0; i < trainers.length; i++) {
                trainers[i].setDataValue("full_name", trainers[i].getFullName());
            }
            // res.send(trainers);
            const message = req.app.locals.message || null;
            const error = req.app.locals.error || null;
            delete req.app.locals.message;
            delete req.app.locals.error;
            res.render("trainers", { trainers: trainers, message: message, error: error});
        })
        .catch((err) => {
            // res.send(err);
            res.render("trainers", { trainers: [], message: null, error: err});
        });
    }
    static formAdd (req, res) {
        Gym.findAll()
        .then((gyms) => {
            const error = req.app.locals.error || null;
            delete req.app.locals.error;
            res.render("trainers-add", { gyms: gyms, error: error });
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
            res.redirect("/trainers/add");
        });
    }
    static create (req, res) {
        // const { first_name, last_name, birth_date, age, GymId } = req.body;
        const { first_name, last_name, birth_date, points, GymId } = req.body;
        Trainer.create({
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            // age: age,
            points: points,
            GymId: GymId
        })
        .then((newTrainer) => {
            // res.send(newTrainer);
            req.app.locals.message = `Success adding new trainer with name ${newTrainer.getFullName()}.`;
            res.redirect("/trainers");
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
            res.redirect("/trainers/add");
        });
    }
}

module.exports = TrainerController;