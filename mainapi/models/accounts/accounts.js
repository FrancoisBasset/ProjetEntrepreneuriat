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
		firstName: {
			type: DataTypes.STRING(100)
		},
		lastName: {
			type: DataTypes.STRING(100)
		},
		organizationName: {
			type: DataTypes.STRING(100)
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
	});

	function getInclude(id) {
		return Accounts.findOne({
			where: {
				id: id
			}
		}).then(function(account) {
			if (account == null) {
				return [];
			}

			if (account.type == 'client') {
				return ['courses', 'card', 'payments'];
			} else if (account.type == 'professionnal') {
				return ['sentCourses'];
			} else {
				return [];
			}
		});
	}

	return {
		Accounts: Accounts,

		getAll: async function() {
			var accountsToReturn = [];

			const accounts = await Accounts.findAll();
			
			for (const account of accounts) {
				accountsToReturn.push(await this.getById(account.id));
			}

			console.log(accountsToReturn);
			
			return accountsToReturn;
		},

		getById: function(id) {
			return getInclude(id).then(function(include) {
				return Accounts.findOne({
					where: {
						id: id
					},
					attributes: {
						exclude: [
							'hash'
						]
					},
					include: include
				});
			});
		},

		exists: function(mail) {
			return Accounts.findOne({
				where: {
					mail: mail
				}
			}).then(function(account) {
				return account != null;
			});
		},

		connect: function(mail, hash) {
			return Accounts.findOne({
				where: {
					mail: mail,
					hash: hash
				}
			}).then(account => {
				if (account == null) {
					return null;
				} else {
					return this.getById(account.id);
				}
			});
		},

		create: function(firstName, lastName, organizationName, mail, hash, type, permanent) {
			return Accounts.create({
				firstName: firstName,
				lastName: lastName,
				organizationName: organizationName,
				mail: mail,
				hash: hash,
				type: type,
				permanent: permanent
			}).then(account => {
				return this.getById(account.id);
			});
		},

		updatePassword: function(id, oldPassword, newPassword) {
			return Accounts.update({
				hash: newPassword
			}, {
				where: {
					id: id,
					hash: oldPassword
				}
			});
		},

		updateAccount: function(id, firstName, lastName, organizationName, mail) {
			return Accounts.update({
				firstName: firstName,
				lastName: lastName,
				organizationName: organizationName,
				mail: mail
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},
		
		deleteAccount: async function(id) {
			const { ClientsCourses, ClientsCertifications } = require('../index');
			
			await ClientsCourses.ClientsCourses.destroy({
				where: {
					accountId: id
				}
			});

			await ClientsCertifications.ClientsCertifications.destroy({
				where: {
					accountId: id
				}
			});

			await Accounts.destroy({
				where: {
					id: id
				}
			});
		}
	};
};