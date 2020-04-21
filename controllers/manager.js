const { Manager, Gym } = require("../models");

class ManagerController {
    static findAll (req, res) {
        Manager.findAll({
            include: [ Gym ]
        })
        .then((managers) => {
            // res.send(managers);
            const message = req.app.locals.message || null;
            const error = req.app.locals.error || null;
            delete req.app.locals.message;
            delete req.app.locals.error;
            res.render("managers", { managers: managers, message: message, error: error});
        })
        .catch((err) => {
            // res.send(err);
            res.render("managers", { managers: [], message: null, error: err});
        });
    }
    static formAdd (req, res) {
        Gym.findAll()
        .then((gyms) => {
            const error = req.app.locals.error || null;
            delete req.app.locals.error;
            res.render("managers-add", { gyms: gyms, error: error });
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
            res.redirect("/managers/add");
        });
    }
    static create (req, res) {
        const { name, GymId } = req.body;
        Manager.create({
            name: name,
            GymId: GymId
        })
        .then((newManager) => {
            // res.send(newManager);
            req.app.locals.message = `Success adding new manager with name ${newManager.name}.`;
            res.redirect("/managers");
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
            res.redirect("/managers/add");
        });
    }
}

module.exports = ManagerController;