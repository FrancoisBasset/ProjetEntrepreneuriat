// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const ClientsCertifications = database.define('clients_certifications', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: true,
			unique: true,

			type: DataTypes.INTEGER
		}
	});

	return {
		ClientsCertifications: ClientsCertifications
	};
};