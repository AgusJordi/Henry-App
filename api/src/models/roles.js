const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
