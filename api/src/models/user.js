const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
          msg: "Campo name - Debe ser una palabra",
        },
      },
    },

    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
          msg: "Campo apellido - Debe ser una palabra",
        },
      },
    },

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        message: "Email must be unique.",
      },
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },

    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gitHubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
