// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const ClientsClasses = database.define('clients_classes', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		}
	});

	return {
		ClientsClasses: ClientsClasses,

		create: function(accountId, classId) {
			return ClientsClasses.create({
				accountId: accountId,
				classId: classId
			});
		}
	};
};