"use strict";
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define(
    "Url",
    {
      destination: DataTypes.STRING,
      short: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Url.associate = function(models) {
    // associations can be defined here
    Url.belongsTo(models.User);
  };
  return Url;
};
