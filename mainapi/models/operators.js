// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Operators = database.define('operators', {
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
		Operators: Operators,

		getById: function(id) {
			const Accounts = require('./index').Accounts;
			return Operators.findOne({
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
			return Operators.findOne({
				where: {
					accountId: id
				}
			}).then(client => {
				return this.getById(client.id);
			});
		},

		create: function(accountId) {
			return Operators.create({
				accountId: accountId
			}).then(client => {
				return this.getById(client.id);
			});
		}
	};
};