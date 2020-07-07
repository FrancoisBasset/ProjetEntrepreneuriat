// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Notifications = database.define('notifications', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,

			type: DataTypes.STRING(100)
		},
		message: {
			allowNull: false,

			type: DataTypes.STRING(1000)
		},
		sent: {
			allowNull: false,
			defaultValue: false,

			type: DataTypes.BOOLEAN
		}
	});

	return {
		Notifications: Notifications,

		getAll: function() {
			return Notifications.findAll();
		},

		getById: function(id) {
			return Notifications.findOne({
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Notifications.findOne({
				where: {
					name: name
				}
			});
		},

		exists: function(name) {
			return Notifications.findOne({
				where: {
					name: name
				}
			}).then(function(notification) {
				return notification != null;
			});
		},

		create: async function(name, message) {
			return Notifications.create({
				name: name,
				message: message
			});
		},

		update: function(id, name, message) {
			return Notifications.update({
				name: name,
				message: message
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		send: function(id) {
			return Notifications.update({
				sent: true
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		}
	};
};