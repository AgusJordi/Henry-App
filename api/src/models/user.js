const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const u = sequelize.define('user', {

        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
