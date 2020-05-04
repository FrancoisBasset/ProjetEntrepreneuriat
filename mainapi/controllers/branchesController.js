const { Domains, Branches } = require('../models');

module.exports = {
	get: function(req, res) {
		var promise;

		if (req.query.search != undefined) {
			promise = Branches.getBranchesByName(req.query.search);
		} else {
			promise = Branches.getAllBranches();
		}

		promise.then(function(branches) {
			res.status(200).json({
				success: true,
				response: branches
			});
		});
	},

	getId: function(req, res) {
		Branches
			.getBranchById(req.params.id)
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

	post: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else if (req.body.domainId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Domain not found'
			});
		} else {
			Branches.getBranch(req.body.name, req.body.domainId)
				.then(function(branch) {
					if (branch != null) {
						res.status(400).json({
							success: false,
							response: 'Branch ' + req.body.name + ' with domain ' + req.body.domainId + ' already exists'
						});
					} else {
						Domains
							.getDomainById(req.body.domainId)
							.then(function(domain) {
								if (domain == null) {
									res.status(400).json({
										success: false,
										response: 'Domain ' + req.body.domainId + ' not found'
									});
								} else {
									Branches
										.createBranch(req.body.name, req.body.domainId)
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

	put: function(req, res) {
		if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else if (req.body.domainId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Domain not found'
			});
		} else {
			Branches
				.getBranchById(req.params.id)
				.then(function(branch) {
					if (branch == null) {
						res.status(400).json({
							success: false,
							response: 'Branch ' + req.params.id + ' not found'
						});
					} else {
						Branches
							.updateBranch(req.params.id, req.body.name, req.body.domainId)
							.then(function() {
								Branches.getBranchById(req.params.id)
									.then(function(branch) {
										res.status(200).json({
											success: true,
											response: branch
										});
									});
							});
					}
				});
		}
	},

	delete: function(req, res) {
		Branches
			.getBranchById(req.params.id)
			.then(function(branch) {
				if (branch == null) {
					res.status(400).json({
						success: false,
						response: 'Branch ' + req.params.id + ' not found'
					});
				} else {
					Branches
						.deleteBranch(req.params.id)
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