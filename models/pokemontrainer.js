'use strict';
module.exports = (sequelize, DataTypes) => {
  class PokemonTrainer extends sequelize.Sequelize.Model {}
  PokemonTrainer.init({
    PokemonId: DataTypes.INTEGER,
    TrainerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "PokemonTrainer"
  });
  PokemonTrainer.associate = function(models) {
    PokemonTrainer.belongsTo(models.Pokemon, { foreignKey: "PokemonId", targetKey: "id" });
    PokemonTrainer.belongsTo(models.Trainer, { foreignKey: "TrainerId", targetKey: "id" });
  };
  return PokemonTrainer;
};