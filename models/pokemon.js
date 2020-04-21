'use strict';
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends sequelize.Sequelize.Model {}
  Pokemon.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    level: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "Pokemon"
  });
  Pokemon.associate = function(models) {
    Pokemon.belongsToMany(models.Trainer, { through: "PokemonTrainers" });
  };
  return Pokemon;
};