const Sequelize = require('sequelize')
const database = require('../database')
const Style = require('../models/style')

    const Beer = database.define('Beer', {
        beerId: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        beerName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        beerStyleId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'Style',
                key: 'styleId',
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Beer.hasOne(Style, { foreignKey: 'beerStyleId', as: 'styleId'});

module.exports = Beer;