const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("feedback", {
    qualification: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    position: {
      type: DataTypes.ENUM('instructor', 'PM', 'pair', 'TL')
    }
  });
};
