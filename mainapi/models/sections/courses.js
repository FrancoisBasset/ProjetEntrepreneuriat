// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Courses = database.define('courses', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,
	
			type: DataTypes.STRING(100)
		},
		image: {
			type: DataTypes.STRING(1000)
		},
		difficulty: {
			type: DataTypes.INTEGER
		},
		objectives: {
			type: DataTypes.STRING(1000)
		},
		paying: {
			type: DataTypes.BOOLEAN
		}
	});

	return {
		Courses: Courses,

		getAll: function() {
			return Courses.findAll({
				include: ['branch', 'author', 'chapters'],
				attributes: {
					exclude: ['branchId', 'authorId']
				},
				order: ['id']
			});
		},

		getById: function(id) {
			const { Chapters } = require('../index');

			return Courses.findOne({
				include: ['branch', 'author', 'chapters'],
				attributes: {
					exclude: ['branchId', 'authorId']
				},
				where: {
					id: id
				},
				order: [
					[Chapters.Chapters, 'index']
				]
			});
		},

		getByName: function(name) {
			return Courses.findAll({
				include: ['branch', 'author', 'chapters'],
				attributes: {
					exclude: ['branchId', 'authorId']
				},
				order: ['id'],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				}
			});
		},

		exists: function(name, branchId, authorId) {
			return Courses.findOne({
				where: {
					name: name,
					branchId: branchId,
					authorId: authorId
				}
			}).then(function(course) {
				return course != null;
			});
		},

		create: function(name, image, branchId, authorId, difficulty, objectives, paying) {
			return Courses.create({
				name: name,
				image: image,
				branchId: branchId,
				authorId: authorId,
				difficulty: difficulty,
				objectives: objectives,
				paying: paying
			}).then((course) => {
				return this.getById(course.id);
			});
		},

		update: function(id, name, image, branchId, authorId, difficulty, objectives, paying) {
			return Courses.update({
				name: name,
				image: image,
				branchId: branchId,
				authorId: authorId,
				difficulty: difficulty,
				objectives: objectives,
				paying: paying
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		delete: async function(id) {
			const course = await this.getById(id);

			await Courses.destroy({
				where: {
					id: id
				}
			});

			return course;
		}
	};
};