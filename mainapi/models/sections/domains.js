// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op, col } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Domains = database.define('domains', {
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
		Domains: Domains,

		getAll: function() {
			return Domains.findAll({
				attributes: {
					exclude: 'sectionId'
				},
				include: [
					'section',
					'branches'
				],
				order: ['id']
			});
		},

		getBySectionId: function(sectionId) {
			return Domains.findOne({
				attributes: {
					exclude: 'sectionId'
				},
				include: [
					'section',
					'branches'
				],
				where: {
					sectionId: sectionId
				}
			});
		},
		
		getByName: function(name) {
			const Sections = require('../index').Sections.Sections;
				
			return Domains.findAll({
				attributes: {
					exclude: [
						'sectionId'
					]
				},
				include: [{
					as: 'section',
					model: Sections,
					where: {
						name: {
							[Op.like]: '%' + name + '%'
						}
					}
				}, 'branches'],
				order: [ 'id' ]
			});
		},

		exists: async function(name) {
			const Sections = require('./sections')(database);

			const section = await Sections.getByName(name);
			
			if (section == null) {
				return false;
			} else {
				const domain = await Domains.findOne({
					where: {
						sectionId: section.id
					}
				});
						
				return domain != null;
			}
		},
	
		create: async function(sectionId) {
			await Domains.create({
				sectionId: sectionId
			});
			
			return this.getBySectionId(sectionId);
		},
	
		update: async function(id, name) {
			await Domains.update({
				name: name
			}, {
				where: {
					id: id
				}
			});
			
			return this.getBySectionId(id);
		},
	
		delete: function(id) {
			return Domains.destroy({
				where: {
					id: id
				}
			});
		}
	};
};