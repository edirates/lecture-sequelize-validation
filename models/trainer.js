'use strict';
const calculateAge = require("../helpers/calculateAge.js");

module.exports = (sequelize, DataTypes) => {
  class Trainer extends sequelize.Sequelize.Model {
    getFullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  }
  Trainer.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `First name must not empty.`
        },
        duplicateName(value, next) {
          Trainer.findOne({
            where: {
              first_name: value
            }
          })
          .then((found) => {
            if (found) {
              const error = new Error (`Trainer with firstname ${found.first_name} already in database.`);
              next(error);
            } else {
              next();
            }
          })
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [ 3, 10 ],
          msg: `Last name must be 3 to 10 characters.`
        }
      }
    },
    birth_date: DataTypes.DATE,
    age: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    GymId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.age = calculateAge(user.birth_date);
      }
    },
    validate: {
      valueNotEmpty() {
        if (this.first_name === "" || this.last_name === "") {
          throw new Error(`Value must not empty.`);
        }
      }
    },
    sequelize,
    modelName: "Trainer"
  });
  Trainer.associate = function(models) {
    Trainer.belongsTo(models.Gym, { foreignKey: "GymId", targetKey: "id" });
    Trainer.belongsToMany(models.Pokemon, { through: "PokemonTrainers" });
  };
  return Trainer;
};