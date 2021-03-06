// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');
const fs = require('fs');

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
			const { Pages } = require('../index');

			return Chapters.findOne({
				include: ['course', 'pages'],
				attributes: {
					exclude: ['courseId']
				},
				where: {
					id: id
				},
				order: [
					[Pages.Pages, 'index']
				]
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

		create: function(name, index, courseId) {
			return Chapters.create({
				name: name,
				index: index,
				courseId: courseId
			}).then((chapter) => {
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

		delete: async function(id) {
			const chapter = await this.getById(id);

			for (const page of chapter.pages) {
				fs.unlinkSync(`assets/pages/page_${page.id}.json`);
			}

			await Chapters.destroy({
				where: {
					id: id
				}
			});

			return chapter;
		},

		quickedit: async function(id, name, index) {
			return Chapters.update({
				name: name,
				index: index
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		setIndex: function(id, index) {
			return Chapters.update({
				index: index
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		resetOrder: async function(courseId) {
			const { Courses } = require('../index');

			return Courses.getById(courseId).then(async course => {
				var index = 0;

				for (const chapter of course.chapters) {
					await this.setIndex(chapter.id, index);
					
					index++;
				}
			});
		}
	};
};