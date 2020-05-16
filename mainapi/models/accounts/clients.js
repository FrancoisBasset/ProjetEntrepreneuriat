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

		getByAccountId: function(accountId) {
			const { Accounts, Courses } = require('../index');
			
			return Clients.findOne({
				include: [{
					model: Accounts.Accounts,
					as: 'account',
					attributes: {
						exclude: 'hash'
					}
				}, {
					model: Courses.Courses,
					as: 'courses'
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
			await Clients.create({
				accountId: accountId
			});
			
			return this.getByAccountId(accountId);
		}
	};
};