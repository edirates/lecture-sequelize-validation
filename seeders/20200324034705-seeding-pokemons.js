'use strict';

const fs = require("fs");

const pokemons = JSON.parse(fs.readFileSync("./files/pokemons.json", "utf8"));
pokemons.forEach((element) => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pokemons', pokemons, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pokemons', null, {});
  }
};
