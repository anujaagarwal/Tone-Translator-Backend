'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
const config = require("./../config/config.json");
const db = {};
const pg = require("pg");
const database = process.env.POSTGRES_DATABASE || config.development.database;
const username = process.env.POSTGRES_USER || config.development.username;
const password = process.env.POSTGRES_PASSWORD || config.development.password;
const url = process.env.POSTGRES_URL || config.development.url;
const host = process.env.POSTGRES_HOST || config.development.host;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(database, username, password,
    {
      url: url,
      host: host,
      port: config.development.port,
      dialect: config.development.dialect,
      dialectModule: pg,
      sslmode: require,
      dialectOptions: {
        ssl: {
          sslmode: "require",
          require: true,
          rejectUnauthorized: true,
        },
      },
    },);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
