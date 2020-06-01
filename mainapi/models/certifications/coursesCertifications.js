// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const CoursesCertifications = database.define('courses_certifications', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: true,
			unique: true,

			type: DataTypes.INTEGER
		}
	});

	return {
		CoursesCertifications: CoursesCertifications,

		create: async function(certificationId, courseId) {
			return CoursesCertifications.create({
				certificationId: certificationId,
				courseId: courseId
			});
		}
	};
};