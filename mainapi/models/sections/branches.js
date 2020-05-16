// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Branches = database.define('branches', {
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
		Branches: Branches,

		getAll: function() {
			return Branches.findAll({
				attributes: {
					exclude: [
						'sectionId',
						'domainId'
					]
				},
				include: [
					'section',
					'domain',
					'courses'
				],
				order: ['id']
			});
		},

		getBySectionId: function(sectionId) {
			return Branches.findOne({
				attributes: {
					exclude: [
						'sectionId',
						'domainId'
					]
				},
				include: [
					'section',
					'domain',
					'courses'
				],
				where: {
					sectionId: sectionId
				}
			});
		},

		getByName: function(name) {
			const Sections = require('../index').Sections.Sections;

			return Branches.findAll({
				attributes: {
					exclude: [
						'sectionId',
						'domainId'
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
					'domain',
					'courses'
				],
				order: ['id']
			});
		},

		exists: async function(name, domainId) {
			const Sections = require('./sections')(database);

			const section = await Sections.getByName(name);
					
			if (section == null) {
				return false;
			} else {
				const branch = await Branches.findOne({
					where: {
						sectionId: section.id,
						domainId: domainId
					}
				});
				
				return branch != null;
			}
		},

		create: async function(sectionId, domainId) {
			await Branches.create({
				sectionId: sectionId,
				domainId: domainId
			});
			
			return this.getBySectionId(sectionId);
		},

		update: async function(id, name) {
			await Branches.update({
				name: name
			}, {
				where: {
					id: id
				}
			});
			
			return this.getBySectionId(id);
		},

		delete: function(id) {
			return Branches.destroy({
				where: {
					id: id
				}
			});
		}
	};
};