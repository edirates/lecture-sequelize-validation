'use strict';

const fs = require("fs");

const managers = JSON.parse(fs.readFileSync("./files/managers.json", "utf8"));
managers.forEach((element) => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Managers', managers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Managers', null, {});
  }
};
