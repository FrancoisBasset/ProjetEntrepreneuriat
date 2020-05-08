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

		getById: function(id) {
			const Accounts = require('./index').Accounts;
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
					id: id
				}
			});
		},

		getByAccountId: function(id) {
			return Professionnals.findOne({
				where: {
					accountId: id
				}
			}).then(client => {
				return this.getById(client.id);
			});
		},

		create: function(accountId) {
			return Professionnals.create({
				accountId: accountId
			}).then(client => {
				return this.getById(client.id);
			});
		}
	};
};