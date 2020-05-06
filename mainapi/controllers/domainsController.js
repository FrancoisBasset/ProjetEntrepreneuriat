const { Domains } = require('../models');

module.exports = {
	// OK
	get: function(req, res) {
		var promise;

		if (req.query.search != undefined) {
			promise = Domains.getByName(req.query.search);
		} else {
			promise = Domains.getAll();
		}

		promise.then(function(domains) {
			res.status(200).json({
				success: true,
				response: domains
			});
		});
	},

	// OK
	getId: function(req, res) {
		Domains
			.getById(req.params.id)
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

	// OK
	post: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else {
			Domains.exists(req.body.name)
				.then(function(exists) {
					if (exists) {
						res.status(400).json({
							success: false,
							response: 'Domain ' + req.body.name + ' already exists'
						});
					} else {
						Domains
							.create(req.body.name)
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

	// OK
	put: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else {
			Domains
				.getById(req.params.id)
				.then(function(domain) {
					if (domain == null) {
						res.status(400).json({
							success: false,
							response: 'Domain ' + req.params.id + ' not found'
						});
					} else {
						Domains
							.update(req.params.id, req.body.name)
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

	// OK
	delete: function(req, res) {
		Domains
			.getById(req.params.id)
			.then(function(domain) {
				if (domain == null) {
					res.status(400).json({
						success: false,
						response: 'Domain ' + req.params.id + ' not found'
					});
				} else {
					Domains
						.delete(req.params.id)
						.then(function() {
							res.status(200).json({
								success: true,
								response: domain
							});
						});
				}
			});
	}
};