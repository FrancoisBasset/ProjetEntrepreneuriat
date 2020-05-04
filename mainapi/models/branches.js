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

		getAllBranches: function() {
			return Branches.findAll({
				attributes: {
					exclude: 'domainId'
				},
				include: 'domain',
				order: ['id']
			});
		},

		getBranchesByName: function(name) {
			return Branches.findAll({
				attributes: {
					exclude: 'domainId'
				},
				include: 'domain',
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				order: ['id']
			});
		},

		getBranchById: function(id) {
			return Branches.findOne({
				attributes: {
					exclude: 'domainId'
				},
				include: 'domain',
				where: {
					id: id
				}
			});
		},

		getBranch: function(name, domainId) {
			return Branches.findOne({
				attributes: {
					exclude: 'domainId'
				},
				include: 'domain',
				where: {
					name: name,
					domainId: domainId
				}
			});
		},

		createBranch: function(name, domainId) {
			return Branches.create({
				name: name,
				domainId: domainId
			}).then(domain => {
				return this.getBranchById(domain.id);
			});
		},

		updateBranch: function(id, name) {
			return Branches.update({
				name: name
			}, {
				where: {
					id: id
				}
			});
		},

		deleteBranch: function(id) {
			return Branches.destroy({
				where: {
					id: id
				}
			});
		}
	};
};