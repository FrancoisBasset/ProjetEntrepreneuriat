const { Sequelize } = require('sequelize');

const database = new Sequelize({
	database: 'entrepreneuriat',
	host: 'localhost',
	username: 'root',
	password: 'root',
	dialect: 'mysql',
	logging: false
});

database.sync({
	force: true
});

module.exports = {
	database: database,

	Sections: require('./sections/sections')(database),
	Domains: require('./sections/domains')(database),
	Branches: require('./sections/branches')(database),
	Courses: require('./sections/courses')(database),
	Chapters: require('./sections/chapters')(database),

	Accounts: require('./accounts/accounts')(database),
	Clients: require('./accounts/clients')(database),
	Professionnals: require('./accounts/professionnals')(database),
	Organizations: require('./accounts/organizations')(database),
	Operators: require('./accounts/operators')(database),

	ClientsCourses: require('./relations/clientsCourses')(database)
};