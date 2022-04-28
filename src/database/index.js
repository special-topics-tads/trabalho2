const Sequelize = require('sequelize');
const dbConfig = require('./config/dbconfig');

const Client = require('../models/Client');
const Associate = require('../models/Associate');
const Motoboy = require('../models/Motoboy');

const connection = new Sequelize(dbConfig);

Client.init(connection);
Associate.init(connection);
Motoboy.init(connection);

Client.associate(connection.models);
Associate.associate(connection.models);
Motoboy.associate(connection.models);

module.exports = connection;
