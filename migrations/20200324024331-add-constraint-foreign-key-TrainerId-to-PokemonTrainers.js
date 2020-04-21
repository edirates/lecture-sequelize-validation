'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("PokemonTrainers", [ "TrainerId" ], {
      type: "foreign key",
      name: "custom_fkey_TrainerId",
      references: {
        table: "Trainers",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("PokemonTrainers", "custom_fkey_TrainerId");
  }
};
