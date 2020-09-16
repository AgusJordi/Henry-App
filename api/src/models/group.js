const { DataTypes } = require('sequelize');

const { User } = require("../db.js");

module.exports = (sequelize) => {
    sequelize.define('group', {
        name: {
            type: DataTypes.STRING
        }
    });
};