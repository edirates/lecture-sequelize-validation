'use strict';
module.exports = (sequelize, DataTypes) => {
  class Gym extends sequelize.Sequelize.Model {}
  Gym.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Gym"
  });
  Gym.associate = function(models) {
    Gym.hasOne(models.Manager, { foreignKey: "GymId", targetKey: "id" });
    Gym.hasMany(models.Trainer, { foreignKey: "GymId", targetKey: "id" });
  };
  return Gym;
};