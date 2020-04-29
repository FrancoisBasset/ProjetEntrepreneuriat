const { Op } = require('sequelize');
const { Domains } = require('../models');

module.exports = {
	getAllDomains: function() {
		return Domains.findAll({
			order: ['id']
		});
	},

	getDomainByName: function(name) {
		return Domains.findOne({
			where: {
				name: name
			}
		});
	},

	getDomainsByName: function(name) {
		return Domains.findAll({
			where: {
				name: {
					[Op.like]: '%' + name + '%'
				}
			},
			order: ['id']
		});
	},

	getDomainById: function(id) {
		return Domains.findOne({
			where: {
				id: id
			}
		});
	},

	createDomain: function(name) {
		return Domains.create({
			name: name
		});
	}
};