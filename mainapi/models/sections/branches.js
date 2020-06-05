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
			unique: true,
	
			type: DataTypes.STRING(100)
		},
		image: {
			type: DataTypes.STRING(1000)
		}
	});

	return {
		Branches: Branches,

		getAll: function() {
			return Branches.findAll({
				include: ['domain', 'courses'],
				attributes: {
					exclude: ['domainId']
				},
				order: ['id']
			});
		},

		getById: function(id) {
			return Branches.findOne({
				include: ['domain', 'courses'],
				attributes: {
					exclude: ['domainId']
				},
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Branches.findAll({
				include: ['domain', 'courses'],
				attributes: {
					exclude: ['domainId']
				},
				order: ['id'],
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				}
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

		create: function(name, image, domainId) {
			return Branches.create({
				name: name,
				image:image,
				domainId: domainId
			}).then((branch) => {
				return this.getById(branch.id);
			});
		},

		update: function(id, name, image, domainId) {
			return Branches.update({
				name: name,
				image: image,
				domainId: domainId
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		delete: async function(id) {
			const branch = await this.getById(id);

			await Branches.destroy({
				where: {
					id: id
				}
			});

			return branch;
		}
	};
};