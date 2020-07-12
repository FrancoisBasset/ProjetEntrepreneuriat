// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Chats = database.define('chats', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		value: {
			allowNull: false,

			type: DataTypes.STRING(1000)
		}
	});

	return {
		Chats: Chats,

		getAllByClass: function(classId) {
			return Chats.findAll({
				where: {
					classId: classId
				},
				include: ['account'],
				order: ['id']
			});
		},

		create: async function(classId, accountId, value) {
			return Chats.create({
				classId: classId,
				accountId: accountId,
				value: value
			});
		}
	};
};