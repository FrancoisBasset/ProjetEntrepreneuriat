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
		},
		name: {
			allowNull: false,
			unique: true,
	
			type: DataTypes.STRING(100)
		},
		image: {
			type: DataTypes.STRING(1000)
		}
	});

	return {
		Domains: Domains,

		getAll: function() {
			return Domains.findAll({
				include: ['branches'],
				order: ['id']
			});
		},

		getById: function(id) {
			return Domains.findOne({
				include: ['branches'],
				where: {
					id: id
				}
			});
		},
		
		getByName: function(name) {
			return Domains.findAll({
				include: ['branches'],
				order: ['id'],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
			});
		},

		exists: function(name) {
			return Domains.findOne({
				where: {
					name: name
				}
			}).then(function(domain) {
				return domain != null;
			});
		},
	
		create: function(name, image) {
			return Domains.create({
				name: name,
				image: image
			}).then((domain) => {
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
	
		delete: async function(id) {
			const domain = await this.getById(id);

			await Domains.destroy({
				where: {
					id: id
				}
			});

			return domain;
		}
	};
};