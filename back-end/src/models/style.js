const Sequelize = require('sequelize')
const database = require('../database')
const Glass = require('../models/glass')

    const Style = database.define('Style', {
        styleId: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        styleName: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        beerGlassId: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Glasses',
                key: 'glassId',
            }
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },
    );

    Style.hasMany(Glass, { foreignKey: 'beerGlassId', as: 'glassId'});

module.exports = Style