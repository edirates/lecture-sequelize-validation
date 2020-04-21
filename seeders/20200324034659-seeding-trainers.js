'use strict';

const fs = require("fs");

const trainers = JSON.parse(fs.readFileSync("./files/trainers.json", "utf8"));
trainers.forEach((element) => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trainers', trainers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trainers', null, {});
  }
};
