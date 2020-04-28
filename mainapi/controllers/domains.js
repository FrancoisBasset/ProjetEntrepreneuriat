const { Op } = require('sequelize');
const { Domains } = require('../models');

module.exports = {
	getAllDomains: function() {
		return Domains.findAll();
	},

	getDomainsByName: function(name) {
		return Domains.findAll({
			where: {
				name: {
					[Op.like]: '%' + name + '%'
				}
			}
		});
	},

	getDomainById: function(id) {
		return Domains.findOne({
			where: {
				id: id
			}
		});
	}
};