const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const setupModels = require('./../db/models');

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: (msg) => console.log(`[Sequelize]: ${msg}`),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

setupModels(sequelize);

module.exports = sequelize;
