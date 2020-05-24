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
		index: {
			allowNull: false,

			type: DataTypes.INTEGER
		},
	});

	return {
		Chapters: Chapters,

		getAll: function() {
			return Chapters.findAll({
				attributes: {
					exclude: [
						'sectionId',
						'courseId'
					]
				},
				include: [
					'section',
					'course',
				],
				order: ['id']
			});
		},

		getBySectionId: function(sectionId) {
			return Chapters.findOne({
				attributes: {
					exclude: [
						'sectionId',
						'courseId'
					]
				},
				include: [
					'section',
					'course'
				],
				where: {
					sectionId: sectionId
				}
			});
		},

		getByName: function(name) {
			const Sections = require('../index').Sections.Sections;

			return Chapters.findAll({
				attributes: {
					exclude: [
						'sectionId',
						'courseId'
					]
				},
				include: [
					{
						as: 'section',
						model: Sections,
						where: {
							name: {
								[Op.like]: '%' + name + '%'
							}
						}
					},
					'course',
				],
				order: ['id']
			});
		},

		exists: async function(name, index, courseId) {
			const { Sections, Courses } = require('../index');

			const section = await Sections.getByName(name);
			
			if (section == null) {
				return false;
			} else {
				const course = await Courses.getBySectionId(courseId);

				const chapter = await Chapters.findOne({
					where: {
						sectionId: section.id,
						index: index,
						courseId: course.id
					}
				});

				return chapter != null;
			}
		},

		create: async function(sectionId, index, courseId) {
			const Courses = require('../index').Courses;

			const course = await Courses.getBySectionId(courseId);

			await Chapters.create({
				sectionId: sectionId,
				courseId: course.id,
				index: index
			});
			
			return this.getBySectionId(sectionId);
		},

		update: async function(id, name, index, courseId) {
			await Chapters.update({
				name: name,
				index: index,
				courseId: courseId
			}, {
				where: {
					id: id
				}
			});
			
			return this.getBySectionId(id);
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