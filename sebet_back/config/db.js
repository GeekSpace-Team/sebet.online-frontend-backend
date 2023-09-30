const { Sequelize } = require('sequelize');

const DATABASE = process.env.DATABASE || 'sebet';
const USERNAME = process.env.USERNAME || 'User';
// const PASSWORD = process.env.PASSWORD || '2005';
const PASSWORD = process.env.PASSWORD || 'Kyyas';
// const HOST = process.env.HOST || '127.0.0.1';
const HOST = process.env.HOST || 'localhost';

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
});

module.exports = db;
