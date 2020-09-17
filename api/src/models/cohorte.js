const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('cohorte', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    });
};