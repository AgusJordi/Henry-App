const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const Feedback = sequelize.define('feedback', {

        qualification: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
}