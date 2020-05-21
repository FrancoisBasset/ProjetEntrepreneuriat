// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Sections = database.define('sections', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		},
		type: {
			allowNull: false,

			type: DataTypes.STRING(20)
		},
		name: {
			allowNull: false,
	
			type: DataTypes.STRING(100)
		},
		image: {
			type: DataTypes.STRING(1000)
		}
	}, {
		paranoid: false,
		createdAt: false,
		updatedAt: false
	});

	return {
		Sections: Sections,

		getById: function(id) {
			return Sections.findOne({
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Sections.findOne({
				where: {
					name: name
				}
			});
		},

		create: function(type, name, image) {
			return Sections.create({
				type: type,
				name: name,
				image: image
			});
		}
	};
};