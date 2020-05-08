const { Domains, Branches } = require('../models');

module.exports = {
	// OK
	get: function(req, res) {
		var promise;

		if (req.query.search == undefined) {
			promise = Branches.getAll();
		} else {
			promise = Branches.getByName(req.query.search);
		}

		promise.then(function(branches) {
			res.status(200).json({
				success: true,
				response: branches
			});
		});
	},

	// OK
	getId: function(req, res) {
		Branches
			.getById(req.params.id)
			.then(function(branch) {
				if (branch == null) {
					res.status(404).json({
						success: false,
						response: 'Branch ' + req.params.id + ' not found'
					});
				} else {
					res.status(200).json({
						success: true,
						response: branch
					});
				}				
			});
	},

	// OK
	post: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name missing'
			});
		} else if (req.body.domainId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Domain missing'
			});
		} else {
			Branches.exists(req.body.name, req.body.domainId)
				.then(function(exists) {
					if (exists) {
						res.status(400).json({
							success: false,
							response: 'Branch ' + req.body.name + ' with domain ' + req.body.domainId + ' already exists'
						});
					} else {
						Domains
							.getById(req.body.domainId)
							.then(function(domain) {
								if (domain == null) {
									res.status(400).json({
										success: false,
										response: 'Domain ' + req.body.domainId + ' not found'
									});
								} else {
									Branches
										.create(req.body.name, req.body.domainId)
										.then(function(branch) {
											res.status(201).json({
												success: true,
												response: branch
											});
										});
								}
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
				response: 'Name missing'
			});
		} else if (req.body.domainId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Domain missing'
			});
		} else {
			Branches
				.getById(req.params.id)
				.then(function(branch) {
					if (branch == null) {
						res.status(400).json({
							success: false,
							response: 'Branch ' + req.params.id + ' not found'
						});
					} else {
						Domains
							.getById(req.body.domainId)
							.then(function(domain) {
								if (domain == null) {
									res.status(400).json({
										success: false,
										response: 'Domain ' + req.body.domainId + ' not found'
									});
								} else {
									Branches
										.update(req.params.id, req.body.name, req.body.domainId)
										.then(function(branch) {
											res.status(200).json({
												success: true,
												response: branch
											});
										});
								}
							});						
					}
				});
		}
	},

	// OK
	delete: function(req, res) {
		Branches
			.getById(req.params.id)
			.then(function(branch) {
				if (branch == null) {
					res.status(400).json({
						success: false,
						response: 'Branch ' + req.params.id + ' not found'
					});
				} else {
					Branches
						.delete(req.params.id)
						.then(function() {
							res.status(200).json({
								success: true,
								response: branch
							});
						});
				}
			});		
	}
};