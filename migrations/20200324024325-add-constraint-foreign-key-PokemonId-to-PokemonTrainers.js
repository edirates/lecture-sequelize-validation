'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("PokemonTrainers", [ "PokemonId" ], {
      type: "foreign key",
      name: "custom_fkey_PokemonId",
      references: {
        table: "Pokemons",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("PokemonTrainers", "custom_fkey_PokemonId");
  }
};
