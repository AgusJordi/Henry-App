const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("checkpoint", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    linkVideos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
