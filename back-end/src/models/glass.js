const Sequelize = require('sequelize')
const database = require('../database')

    const Glass = database.define('Glass', {
        glassId: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        glassName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },
    );

module.exports = Glass;