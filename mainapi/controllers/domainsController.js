
const { Domains } = require('../models');

module.exports = {
	get: function(req, res) {
		var promise;

		if (req.query.search != undefined) {
			promise = Domains.getDomainsByName(req.query.search);
		} else {
			promise = Domains.getAllDomains();
		}

		promise.then(function(domains) {
			res.status(200).json({
				success: true,
				response: domains
			});
		});
	},

	getId: function(req, res) {
		Domains
			.getDomainById(req.params.id)
			.then(function(domain) {
				if (domain == null) {
					res.status(404).json({
						success: false,
						response: 'Domain ' + req.params.id + ' not found'
					});
				} else {
					res.status(200).json({
						success: true,
						response: domain
					});
				}
			});
	},

	post: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else {
			Domains.getDomainByName(req.body.name)
				.then(function(domain) {
					if (domain != null) {
						res.status(400).json({
							success: false,
							response: 'Domain ' + req.body.name + ' already exists'
						});
					} else {
						Domains
							.createDomain(req.body.name)
							.then(function(domain) {
								res.status(201).json({
									success: true,
									response: domain
								});
							});
					}
				});
		}
	},

	put: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				body: 'Name not found'
			});
		} else {
			Domains
				.getDomainById(req.params.id)
				.then(function(domain) {
					if (domain == null) {
						res.status(400).json({
							success: false,
							response: 'Domain ' + req.params.id + ' not found'
						});
					} else {
						Domains
							.updateDomain(req.params.id, req.body.name)
							.then(function(domain) {
								res.status(200).json({
									success: true,
									response: domain
								});
							});
					}
				});
		}
	},

	delete: function(req, res) {
		Domains
			.getDomainById(req.params.id)
			.then(function(domain) {
				if (domain == null) {
					res.status(400).json({
						success: false,
						response: 'Domain ' + req.params.id + ' not found'
					});
				} else {
					Domains
						.deleteDomain(req.params.id)
						.then(function(domain) {
							res.status(200).json({
								success: true,
								response: domain
							});
						});
				}
			});
	}
};