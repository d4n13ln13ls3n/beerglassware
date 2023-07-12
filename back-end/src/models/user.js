const Sequelize = require('sequelize')
const database = require('../database')

    const User = Sequelize.define('user', {
        userId: {
            type: database.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userName: {
            type: database.STRING(20),
            allowNull: false,
        },
    });

module.exports = User;