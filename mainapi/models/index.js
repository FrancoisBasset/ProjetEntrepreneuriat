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
const Branches = require('./branches')(database);

Branches.Branches.belongsTo(Domains.Domains, {
	as: 'domain'
});

Domains.Domains.hasMany(Branches.Branches, {
	as: 'branches',
	foreignKey: {
		allowNull: false
	}
});

database.sync({
	force: true
});

module.exports = {
	database,
	Domains,
	Branches
};