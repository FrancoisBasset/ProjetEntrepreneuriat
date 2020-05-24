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
				return ['courses'];
			} else if (account.type == 'professionnal') {
				return ['sentCourses'];
			} else {
				return [];
			}
		});
	}

	return {
		Accounts: Accounts,

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

		create: function(mail, hash, type, permanent) {
			return Accounts.create({
				mail: mail,
				hash: hash,
				type: type,
				permanent: permanent
			}).then(account => {
				return this.getById(account.id);
			});
		},
	};
};