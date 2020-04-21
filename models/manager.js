'use strict';
module.exports = (sequelize, DataTypes) => {
  class Manager extends sequelize.Sequelize.Model {}
  Manager.init({
    name: DataTypes.STRING,
    GymId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Manager"
  });
  Manager.associate = function(models) {
    Manager.belongsTo(models.Gym, { foreignKey: "GymId", targetKey: "id" });
  };
  return Manager;
};