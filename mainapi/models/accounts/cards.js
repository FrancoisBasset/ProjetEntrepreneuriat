// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Cards = database.define('cards', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			unique: true,

			type: DataTypes.STRING(500)
		},
		expiryDate: {
			allowNull: false,

			type: DataTypes.STRING(5)
		},
		balance: {
			allowNull: false,

			type: DataTypes.INTEGER
		}
	});

	return {
		Cards: Cards,

		getByAccountId: function(id) {
			return Cards.findOne({
				where: {
					accountId: id
				}
			});
		},

		create: async function(id, code, expiryDate, balance) {
			return Cards.create({
				code: code,
				expiryDate: expiryDate,
				balance: balance,
				accountId: id
			});
		},
		
		deleteCard: async function(id) {
			await Cards.destroy({
				where: {
					accountId: id
				}
			});
		}
	};
};