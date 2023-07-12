const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')})
// require('dotenv').config()

const config = {
  username: process.env.DB_USER,
  // username: 'danielyabu',
  password: process.env.DB_PASSWORD,
  // password: 'd4n13l',
  database: process.env.DB_NAME,
  // database: 'beerdata',
  host: process.env.DB_HOST,
  // host: 'localhost',
  port: Number(process.env.DB_PORT),
  // port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: true,
  },
};

module.exports = config;