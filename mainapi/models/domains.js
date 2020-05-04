// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');
//const { Branches } = require('./index');

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
		},
		name: {
			allowNull: false,
			unique: true,
	
			type: DataTypes.STRING(100)
		}
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		Domains: Domains,

		getAllDomains: function() {
			return Domains.findAll({
				include: 'branches',
				order: ['id']
			});
		},

		getDomainByName: function(name) {
			return Domains.findOne({
				include: 'branches',
				where: {
					name: name
				}
			});
		},
	
		getDomainsByName: function(name) {
			return Domains.findAll({
				include: 'branches',
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				order: ['id']
			});
		},
	
		getDomainById: function(id) {
			return Domains.findOne({
				include: 'branches',
				where: {
					id: id
				}
			});
		},
	
		createDomain: function(name) {
			return Domains.create({
				name: name
			}).then(domain => {
				return this.getDomainById(domain.id);
			});
		},
	
		updateDomain: function(id, name) {
			return Domains.update({
				name: name
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getDomainById(id);
			});
		},
	
		deleteDomain: function(id) {
			return this.getDomainById(id).then(function(domain) {
				return Domains.destroy({
					where: {
						id: id
					}
				}).then(function() {
					return domain;
				});
			});
		}
	};
};