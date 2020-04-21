'use strict';

const fs = require("fs");

const pokemonTrainers = JSON.parse(fs.readFileSync("./files/pokemontrainers.json", "utf8"));
pokemonTrainers.forEach((element) => {
  element["createdAt"] = new Date();
  element["updatedAt"] = new Date();
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PokemonTrainers', pokemonTrainers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PokemonTrainers', null, {});
  }
};
