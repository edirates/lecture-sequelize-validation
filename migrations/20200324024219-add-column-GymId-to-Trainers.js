'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Trainers", "GymId", { 
      type: Sequelize.INTEGER,
      references: {
        model: "Gyms",
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Trainers", "GymId");
  }
};
