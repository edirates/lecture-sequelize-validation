'use strict';

const fs = require("fs");

const gyms = JSON.parse(fs.readFileSync("./files/gyms.json", "utf8"));
gyms.forEach((element) => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gyms', gyms, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gyms', null, {});
  }
};
