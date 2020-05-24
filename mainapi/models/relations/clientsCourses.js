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
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		ClientsCourses: ClientsCourses,

		favorite: async function(clientId, courseId, favorite) {
			const { Accounts, Courses } = require('../index');

			const course = await Courses.getBySectionId(courseId);
			const client = await Accounts.getById(clientId);

			await ClientsCourses.upsert({
				clientId: client.id,
				courseId: course.id,
				favorite: favorite
			});

			return Accounts.getById(clientId);
		},

		start: async function(clientId, courseId, chapterId) {
			const { Accounts, Courses, Chapters } = require('../index');

			const client = await Accounts.getById(clientId);
			const course = await Courses.getBySectionId(courseId);

			if (chapterId != null) {
				chapterId = await Chapters.getBySectionId(chapterId);
				chapterId = chapterId.id;
			}

			await ClientsCourses.upsert({
				clientId: client.id,
				courseId: course.id,
				started: true,
				chapterId: chapterId
			});

			return Accounts.getById(clientId);
		}
	};
};