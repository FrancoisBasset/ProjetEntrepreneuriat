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

		getByAccountId: function(accountId) {
			const Accounts = require('../index').Accounts;
			
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
					accountId: accountId
				}
			});
		},

		create: async function(accountId) {
			await Operators.create({
				accountId: accountId
			});
			
			return this.getByAccountId(accountId);
		}
	};
};