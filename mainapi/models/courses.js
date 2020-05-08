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
	
			type: DataTypes.STRING(100)
		},
		authorId: {
			allowNull: false,

			type: DataTypes.INTEGER
		}
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		Courses: Courses,

		getAll: function() {
			return Courses.findAll({
				attributes: {
					exclude: 'branchId'
				},
				include: [
					'chapters',
					'branch'
				],
				order: ['id']
			});
		},

		getById: function(id) {
			return Courses.findOne({
				attributes: {
					exclude: 'branchId'
				},
				include: [
					'chapters',
					'branch'
				],
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Courses.findAll({
				attributes: {
					exclude: 'branchId'
				},
				include: [
					'chapters',
					'branch'
				],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				order: ['id']
			});
		},

		exists: function(name, branchId) {
			return Courses.findOne({
				where: {
					name: name,
					branchId: branchId
				}
			}).then(function(course) {
				return course != null;
			});
		},

		create: function(name, branchId) {
			return Courses.create({
				name: name,
				branchId: branchId
			}).then(course => {
				return this.getById(course.id);
			});
		},

		update: function(id, name) {
			return Courses.update({
				name: name
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		delete: function(id) {
			return Courses.destroy({
				where: {
					id: id
				}
			});
		}
	};
};