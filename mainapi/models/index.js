const { Sequelize } = require('sequelize');

const database = new Sequelize({
	database: 'entrepreneuriat',
	host: 'localhost',
	username: 'root',
	password: 'root',
	dialect: 'mysql',
	logging: false
});

const Domains = require('./domains')(database);

/*database.sync({
	force: true
});*/

module.exports = {
	database,
	Domains
};