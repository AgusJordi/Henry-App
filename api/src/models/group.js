const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('group', {
        name: {
            type: DataTypes.STRING
        },
    });
};