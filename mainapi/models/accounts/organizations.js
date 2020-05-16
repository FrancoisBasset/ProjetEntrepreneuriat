// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Organizations = database.define('organizations', {
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
		Organizations: Organizations,

		getByAccountId: function(accountId) {
			const Accounts = require('../index').Accounts;
			
			return Organizations.findOne({
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
			await Organizations.create({
				accountId: accountId
			});
			
			return this.getByAccountId(accountId);
		}
	};
};