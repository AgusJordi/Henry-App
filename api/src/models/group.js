const { DataTypes } = require('sequelize');

const { User } = require("../db.js");

module.exports = (sequelize) => {
    sequelize.define('group', {
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                var prefijo = "WEBFT"
                var cohorteId = this.getDataValue('cohorteId')
                var id = this.getDataValue('id')
                return prefijo + "0" + cohorteId + "_" + id
            }
        },
    });
};