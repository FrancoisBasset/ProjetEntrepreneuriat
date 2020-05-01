const { Op } = require('sequelize');
const { Domains } = require('../models');

function getErrors(err) {
	var errors = [];
	for (const error of err.errors) {
		errors.push(error.validatorKey);
	}

	return errors;
}

module.exports = {
	getAllDomains: function() {
		return Domains.findAll({
			order: ['id']
		}).then(function(domain) {
			return {
				success: true,
				response: domain
			};
		}).catch(function(err) {
			return {
				success: false,
				errors: getErrors(err)
			};
		});
	},

	getDomainByName: function(name) {
		return Domains.findOne({
			where: {
				name: name
			}
		}).then(function(domains) {
			return {
				success: true,
				response: domains
			};
		}).catch(function(err) {
			return {
				success: false,
				errors: getErrors(err)
			};
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
		}).then(function(domains) {
			return {
				success: true,
				response: domains
			};
		}).catch(function(err) {
			return {
				success: false,
				errors: getErrors(err)
			};
		});
	},

	getDomainById: function(id) {
		return Domains.findOne({
			where: {
				id: id
			}
		}).then(function(domain) {
			return {
				success: true,
				response: domain
			};
		}).catch(function(err) {
			return {
				success: false,
				errors: getErrors(err)
			};
		});
	},

	createDomain: function(name) {
		return Domains.create({
			name: name
		}).then(function(domain) {
			return {
				success: true,
				response: domain
			};
		}).catch(function(err) {
			return {
				success: false,
				errors: getErrors(err)
			};
		});
	}
};