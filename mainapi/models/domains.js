// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	return database.define('domains', {
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
		}
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});
};