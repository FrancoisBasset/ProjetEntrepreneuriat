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
			unique: true,
	
			type: DataTypes.STRING(100)
		},
		image: {
			type: DataTypes.STRING(1000)
		},
		index: {
			allowNull: false,

			type: DataTypes.INTEGER
		},
	});

	return {
		Chapters: Chapters,

		getAll: function() {
			return Chapters.findAll({
				include: ['course', 'pages'],
				attributes: {
					exclude: ['courseId']
				},
				order: ['id']
			});
		},

		getById: function(id) {
			return Chapters.findOne({
				include: ['course', 'pages'],
				attributes: {
					exclude: ['courseId']
				},
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Chapters.findAll({
				include: ['course', 'pages'],
				attributes: {
					exclude: ['courseId']
				},
				order: ['id'],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				}
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

		create: function(name, image, index, courseId) {
			return Chapters.create({
				name: name,
				image: image,
				index: index,
				courseId: courseId
			}).then((chapter) => {
				return this.getById(chapter.id);
			});
		},

		update: function(id, name, image, index, courseId) {
			return Chapters.update({
				name: name,
				image: image,
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

		delete: async function(id) {
			const chapter = await this.getById(id);

			await Chapters.destroy({
				where: {
					id: id
				}
			});

			return chapter;
		}
	};
};