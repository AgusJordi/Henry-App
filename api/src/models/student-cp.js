const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("student_cp", {
        qualification: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};