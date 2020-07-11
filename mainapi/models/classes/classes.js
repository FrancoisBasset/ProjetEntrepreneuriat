// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Classes = database.define('classes', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,

			type: DataTypes.STRING(100)
		},
		description: {
			type: DataTypes.STRING(1000)
		},
		private: {
			allowNull: false,
			defaultValue: false,

			type: DataTypes.BOOLEAN
		},
		price: {
			allowNull: false,
			defaultValue: 0,

			type: DataTypes.FLOAT
		},
		fonctionnalities: {
			allowNull: false,
			defaultValue: '',

			type: DataTypes.STRING(500)
		},
		date: {
			type: DataTypes.DATEONLY
		},
		beginHour: {
			type: DataTypes.TIME
		},
		endHour: {
			type: DataTypes.TIME
		}
	});

	return {
		Classes: Classes,

		getAll: function() {
			return Classes.findAll();
		},

		getByProfessionnalId: function(professionnalId) {
			return Classes.findAll({
				where: {
					professionnalId: professionnalId
				}
			});
		},

		getById: function(id) {
			return Classes.findOne({
				where: {
					id: id
				}
			});
		},

		getByName: function(name) {
			return Classes.findAll({
				where: {
					name: {
						[Op.like]: '%' + name + '%'	
					}
				}
			});
		},

		create: async function(professionnalId, name, description, private, price, fonctionnalities) {
			return Classes.create({
				name: name,
				description: description,
				private: private,
				price: price,
				fonctionnalities: fonctionnalities,
				professionnalId: professionnalId
			});
		},

		update: function(id, name, description, private, price, fonctionnalities) {
			return Classes.update({
				name: name,
				description: description,
				private: private,
				price: price,
				fonctionnalities: fonctionnalities
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		plan: function(id, date, beginHour, endHour) {
			return Classes.update({
				date: date,
				beginHour: beginHour,
				endHour: endHour
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