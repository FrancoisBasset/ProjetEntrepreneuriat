// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Accounts = database.define('accounts', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		},
		mail: {
			allowNull: false,
			unique: true,
	
			type: DataTypes.STRING(100)
		},
		hash: {
			allowNull: false,

			type: DataTypes.STRING(1000)
		},
		type: {
			allowNull: false,

			type: DataTypes.STRING(20)
		},
		permanent: {
			allowNull: false,

			type: DataTypes.BOOLEAN
		}
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		Accounts: Accounts,

		getByMail: function(mail) {
			return Accounts.findOne({
				where: {
					mail: mail
				}
			});
		},

		connect: function(mail, hash) {
			return Accounts.findOne({
				attributes: {
					exclude: 'hash'
				},
				where: {
					mail: mail,
					hash: hash
				}
			});
		},

		create: function(mail, hash, type, permanent) {
			return Accounts.create({
				mail: mail,
				hash: hash,
				type: type,
				permanent: permanent
			});
		},
	};
};