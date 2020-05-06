// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

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

		getAll: function() {
			return Domains.findAll({
				include: 'branches',
				order: ['id']
			});
		},

		getById: function(id) {
			return Domains.findOne({
				include: 'branches',
				where: {
					id: id
				}
			});
		},
		
		getByName: function(name) {
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

		exists: function(name) {
			return Domains.findOne({
				include: 'branches',
				where: {
					name: name
				}
			}).then(function(domain) {
				return domain != null;
			});
		},
	
		create: function(name) {
			return Domains.create({
				name: name
			}).then(domain => {
				return this.getById(domain.id);
			});
		},
	
		update: function(id, name) {
			return Domains.update({
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
			return Domains.destroy({
				where: {
					id: id
				}
			});
		}
	};
};