const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('cohorte', {
        name: {
            type: DataTypes.VIRTUAL,
            get() {
                var prefijo = "WEBFT"
                var id = this.getDataValue('id')
                return prefijo + "0" + id
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        }
    });
};