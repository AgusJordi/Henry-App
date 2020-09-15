const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('cohorte', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        /*date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        } falta habilitar cuando tengamos el modelo en front*/ 
    });
};