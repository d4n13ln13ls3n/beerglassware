const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./server/db')
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres://danielyabu:d4n13l@localhost:5432/beerdata')
const glassesModel = require('./src/models/glass')
const stylesModel = require('./src/models/style')
const beersModel = require('./src/models/beer')

app.use(cors());
app.use(express.json());

app.get('/glasses', async (req, res) => {
    try {
      const beerName = req.query.beer;
      if (!beerName) {
        return res.status(400).json({ message: "Missing required query param 'beer'" });
      }
  
      const beers = await beersModel.findAll({
        where: {
          beerName,
        },
      });
  
      const beerStyleIds = beers.map((beer) => beer.beerStyleId);
  
      const glassIds = await Promise.all(beerStyleIds.map(async (beerStyleId) => {
        const styles = await stylesModel.findAll({
          where: {
            styleId: beerStyleId,
          },
          raw: true,
          attributes: ['glassId'],
        });
        return styles.map((style) => style.glassId);
      }));
  
      const flattenedGlassIds = glassIds.flat();
  
      const glassNames = await Promise.all(flattenedGlassIds.map(async (glassId) => {
        const glasses = await glassesModel.findAll({
          where: {
            glassId: glassId,
          },
          raw: true,
          attributes: ['glassName'],
        });
        return glasses.map((glass) => glass.glassName);
      }));
  
      const flattenedGlassNames = glassNames.flat();
  
      res.json(flattenedGlassNames);
    } catch (error) {
      console.error(error.message);
    }
  });
  
async function run () {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

app.listen(5000, () => {
    console.log('server has started on port 5000');
});

run()