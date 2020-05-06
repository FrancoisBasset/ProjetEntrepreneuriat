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
		},
		name: {
			allowNull: false,
	
			type: DataTypes.STRING(100)
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
					exclude: 'domainId'
				},
				include: [
					'domain',
					'courses'
				],
				order: ['id']
			});
		},

		getById: function(id) {
			return Branches.findOne({
				attributes: {
					exclude: 'domainId'
				},
				include: [
					'domain',
					'courses'
				],
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Branches.findAll({
				attributes: {
					exclude: 'domainId'
				},
				include: [
					'domain',
					'courses'
				],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				order: ['id']
			});
		},

		exists: function(name, domainId) {
			return Branches.findOne({
				where: {
					name: name,
					domainId: domainId
				}
			}).then(function(branch) {
				return branch != null;
			});
		},

		create: function(name, domainId) {
			return Branches.create({
				name: name,
				domainId: domainId
			}).then(branch => {
				return this.getById(branch.id);
			});
		},

		update: function(id, name) {
			return Branches.update({
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
			return Branches.destroy({
				where: {
					id: id
				}
			});
		}
	};
};