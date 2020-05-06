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
const Courses = require('./courses')(database);
const Chapters = require('./chapters')(database);

Domains.Domains.hasMany(Branches.Branches, {
	as: 'branches',
	foreignKey: {
		allowNull: false
	}
});
Branches.Branches.belongsTo(Domains.Domains, {
	as: 'domain'
});

Branches.Branches.hasMany(Courses.Courses, {
	as: 'courses',
	foreignKey: {
		allowNull: false
	}
});
Courses.Courses.belongsTo(Branches.Branches, {
	as: 'branch'
});

Courses.Courses.hasMany(Chapters.Chapters, {
	as: 'chapters',
	foreignKey: {
		allowNull: false
	}
});
Chapters.Chapters.belongsTo(Courses.Courses, {
	as: 'course'
});

database.sync({
	force: true
});

module.exports = {
	database,
	Domains,
	Branches,
	Courses,
	Chapters
};