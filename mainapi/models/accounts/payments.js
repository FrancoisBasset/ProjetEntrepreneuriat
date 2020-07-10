// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Payments = database.define('payments', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		amount: {
			allowNull: false,

			type: DataTypes.DOUBLE
		},
		item: {
			allowNull: false,

			type: DataTypes.STRING(50)
		}
	});

	return {
		Payments: Payments,

		getAll: function() {
			return Payments.findAll();
		},

		create: async function(accountId, cardId, amount, item) {
			const { Cards } = require('../index');

			await Payments.create({
				amount: amount,
				item: item,
				accountId: accountId
			});

			await Cards.removeAmount(cardId, amount);
		}
	};
};