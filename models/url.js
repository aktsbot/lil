"use strict";
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define(
    "Url",
    {
      destination: DataTypes.STRING,
      short: DataTypes.STRING,
      createdDateTime: DataTypes.DATE,
      updatedDateTime: DataTypes.DATE,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Url.associate = function(models) {
    // associations can be defined here
  };
  return Url;
};
