const { Op } = require('sequelize');
const { Domains } = require('../models');

function handleResponse(status, success, body) {
	return {
		status: status,
		success: success,
		body: body
	};
}

function handleError(err) {
	return {
		status: 500,
		success: false,
		error: err.name + ': ' + err.original.errno
	};
}

module.exports = {
	getAllDomains: function() {
		return Domains.findAll({
			order: ['id']
		}).then(function(domains) {
			return handleResponse(200, true, domains);
		}).catch(function(err) {
			return handleError(err);
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
			return handleResponse(200, true, domains);
		}).catch(function(err) {
			return handleError(err);
		});
	},

	getDomainById: function(id) {
		return Domains.findOne({
			where: {
				id: id
			}
		}).then(function(domain) {
			if (domain == null) {
				return handleResponse(404, false, 'Domain not found with id ' + id);
			} else {
				return handleResponse(200, true, domain);
			}
		}).catch(function(err) {
			return handleError(err);
		});
	},

	createDomain: function(name) {
		return Domains.findOne({
			where: {
				name: name
			}
		}).then(function(domain) {
			if (domain != null) {
				return handleResponse(400, false, 'Domain ' + name + ' already exists');
			} else {
				return Domains.create({
					name: name
				}).then(function(domain) {
					return handleResponse(201, true, domain);
				}).catch(function(err) {
					return handleError(err);
				});
			}
		}).catch(function(err) {
			return handleError(err);
		});
	},

	updateDomain: function(id, name) {
		return this.getDomainById(id).then(response => {
			if (response.success == false) {
				return handleResponse(400, false, 'Domain not found with id ' + id);
			}

			return Domains.update({
				name: name
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getDomainById(id);
			}).catch(function(err) {
				return handleError(err);
			});
		});
	}
};