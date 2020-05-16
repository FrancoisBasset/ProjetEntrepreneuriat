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
					exclude: [
						'sectionId',
						'branchId',
						'authorId'
					]
				},
				include: [
					'section',
					'branch',
					'author',
					'chapters'
				],
				order: ['id']
			});
		},

		getBySectionId: function(sectionId) {
			return Courses.findOne({
				attributes: {
					exclude: [
						'sectionId',
						'branchId',
						'authorId'
					]
				},
				include: [
					'section',
					'branch',
					'author',
					'chapters'
				],
				where: {
					sectionId: sectionId
				}
			});
		},

		getByName: function(name) {
			const Sections = require('../index').Sections.Sections;

			return Courses.findAll({
				attributes: {
					exclude: [
						'sectionId',
						'branchId',
						'authorId'
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
					'branch',
					'author',
					'chapters'
				],
				order: ['id']
			});
		},

		exists: async function(name, branchId, authorId) {
			const { Accounts, Branches, Sections } = require('../index');

			const section = await Sections.getByName(name);
			
			if (section == null) {
				return false;
			} else {
				const branch = await Branches.getBySectionId(branchId);
				const author = await Accounts.getById(authorId);
							
				const course = await Courses.findOne({
					where: {
						sectionId: section.id,
						branchId: branch.id,
						authorId: author.id
					}
				});
				
				return course != null;
			}
		},

		create: async function(sectionId, branchId, authorId) {
			const { Accounts, Branches } = require('../index');

			const account = await Accounts.getById(authorId);
			const branch = await Branches.getBySectionId(branchId);
			
			await Courses.create({
				sectionId: sectionId,
				branchId: branch.id,
				authorId: account.id
			});
			
			return this.getBySectionId(sectionId);
		},

		update: async function(id, name) {
			await Courses.update({
				name: name
			}, {
				where: {
					id: id
				}
			});
			
			return this.getBySectionId(id);
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