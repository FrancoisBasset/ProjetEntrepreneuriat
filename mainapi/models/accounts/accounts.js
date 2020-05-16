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

		getById: async function(id) {
			const { Clients, Professionnals, Organizations, Operators } = require('../index');

			const account = await Accounts.findOne({
				where: {
					id: id
				}
			});
			
			if (account == null) {
				return null;
			}

			switch (account.type) {
			case 'client':
				return Clients.getByAccountId(id);
			case 'professionnal':
				return Professionnals.getByAccountId(id);
			case 'organization':
				return Organizations.getByAccountId(id);
			case 'operator':
				return Operators.getByAccountId(id);
			}
		},

		exists: async function(mail) {
			const account = await Accounts.findOne({
				where: {
					mail: mail
				}
			});

			return account != null;
		},

		connect: async function(mail, hash) {
			const account = await Accounts.findOne({
				attributes: {
					exclude: 'hash'
				},
				where: {
					mail: mail,
					hash: hash
				}
			});
			
			if (account == null) {
				return null;
			} else {
				return this.getById(account.id);
			}
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