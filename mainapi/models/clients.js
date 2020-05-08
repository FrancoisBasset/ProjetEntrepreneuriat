// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Clients = database.define('clients', {
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
		Clients: Clients,

		getById: function(id) {
			const Accounts = require('./index').Accounts;
			return Clients.findOne({
				include: [{
					model: Accounts.Accounts,
					as: 'account',
					attributes: {
						exclude: 'hash'
					}
				}],
				attributes: {
					exclude: 'accountId'
				},
				where: {
					id: id
				}
			});
		},

		getByAccountId: function(id) {
			return Clients.findOne({
				where: {
					accountId: id
				}
			}).then(client => {
				return this.getById(client.id);
			});
		},

		create: function(accountId) {
			return Clients.create({
				accountId: accountId
			}).then(client => {
				return this.getById(client.id);
			});
		}
	};
};