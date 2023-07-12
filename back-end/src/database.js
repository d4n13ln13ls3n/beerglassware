require('dotenv').config({ path: '../.env'})

// console.log('ENV.DB.PzASSWORD:', process.env.DB_PASSWORD)
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    // 'beerdata', 'danielyabu', 'd4n13l',
    process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, 
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            timestamps: false,
        },
    }
)

module.exports = sequelize;