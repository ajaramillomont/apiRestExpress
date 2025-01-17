const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbnName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log(`[Sequelize]: ${msg}`),
});

setupModels(sequelize);

if(process.env.NODE_ENV !== 'production') {
  sequelize.sync();
}

module.exports = sequelize;
