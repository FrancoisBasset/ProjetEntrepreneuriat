// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Professionnals = database.define('professionnals', {
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
		Professionnals: Professionnals,

		getByAccountId: function(accountId) {
			const Accounts = require('../index').Accounts;
			
			return Professionnals.findOne({
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
			await Professionnals.create({
				accountId: accountId
			});
			
			return this.getByAccountId(accountId);
		}
	};
};