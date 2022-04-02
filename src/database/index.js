const Sequelize = require('sequelize');
const dbConfig = require('./config/dbconfig');

const Client = require('../models/Client');

const connection = new Sequelize(dbConfig);

Client.init(connection);

Client.associate(connection.models);

module.exports = connection;
