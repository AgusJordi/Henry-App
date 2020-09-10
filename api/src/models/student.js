const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('student', {
        groupPP: {
            type: DataTypes.INTEGER
        }
    });
};