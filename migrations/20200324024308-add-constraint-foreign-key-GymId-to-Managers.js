'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Managers", [ "GymId" ], {
      type: "foreign key",
      name: "custom_fkey_GymId",
      references: {
        table: "Gyms",
        field: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Managers", "custom_fkey_GymId");
  }
};
