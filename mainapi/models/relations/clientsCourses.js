// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const ClientsCourses = database.define('clients_courses', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		},
		favorite: {
			type: DataTypes.BOOLEAN
		},
		started: {
			type: DataTypes.BOOLEAN
		}
	});

	return {
		ClientsCourses: ClientsCourses,

		favorite: async function(accountId, courseId, favorite) {
			const { Accounts } = require('../index');

			await ClientsCourses.upsert({
				accountId: accountId,
				courseId: courseId,
				favorite: favorite
			});

			return Accounts.getById(accountId);
		},

		start: async function(accountId, courseId, chapterId) {
			const { Accounts } = require('../index');

			await ClientsCourses.upsert({
				accountId: accountId,
				courseId: courseId,
				started: true,
				chapterId: chapterId
			});

			return Accounts.getById(accountId);
		}
	};
};