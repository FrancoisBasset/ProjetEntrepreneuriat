// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Chapters = database.define('chapters', {
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
		index: {
			allowNull: false,

			type: DataTypes.INTEGER
		},
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		Chapters: Chapters,

		getAll: function() {
			return Chapters.findAll({
				attributes: {
					exclude: 'courseId'
				},
				include: 'course',
				order: ['id']
			});
		},

		getById: function(id) {
			return Chapters.findOne({
				attributes: {
					exclude: 'courseId'
				},
				include: 'course',
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Chapters.findAll({
				attributes: {
					exclude: 'courseId'
				},
				include: 'course',
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				order: ['id']
			});
		},

		exists: function(name, index, courseId) {
			return Chapters.findOne({
				where: {
					name: name,
					index: index,
					courseId: courseId
				}
			}).then(function(chapter) {
				return chapter != null;
			});
		},

		create: function(name, index, courseId) {
			return Chapters.create({
				name: name,
				index: index,
				courseId: courseId
			}).then(chapter => {
				return this.getById(chapter.id);
			});
		},

		update: function(id, name, index, courseId) {
			return Chapters.update({
				name: name,
				index: index,
				courseId: courseId
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		delete: function(id) {
			return Chapters.destroy({
				where: {
					id: id
				}
			});
		}
	};
};