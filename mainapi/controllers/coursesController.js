const { Branches, Courses } = require('../models');

module.exports = {
	// OK
	get: function(req, res) {
		var promise;

		if (req.query.search != undefined) {
			promise = Courses.getByName(req.query.search);
		} else {
			promise = Courses.getAll();
		}

		promise.then(function(courses) {
			res.status(200).json({
				success: true,
				response: courses
			});
		});
	},

	// OK
	getId: function(req, res) {
		Courses
			.getById(req.params.id)
			.then(function(course) {
				if (course == null) {
					res.status(404).json({
						success: false,
						response: 'Course ' + req.params.id + ' not found'
					});
				} else {
					res.status(200).json({
						success: true,
						response: course
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
		} else if (req.body.branchId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Branch not found'
			});
		} else {
			Courses.exists(req.body.name, req.body.branchId)
				.then(function(exists) {
					if (exists) {
						res.status(400).json({
							success: false,
							response: 'Course ' + req.body.name + ' with branch ' + req.body.branchId + ' already exists'
						});
					} else {
						Branches
							.getById(req.body.branchId)
							.then(function(branch) {
								if (branch == null) {
									res.status(400).json({
										success: false,
										response: 'Branch ' + req.body.branchId + ' not found'
									});
								} else {
									Courses
										.create(req.body.name, req.body.branchId)
										.then(function(course) {
											res.status(201).json({
												success: true,
												response: course
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
				response: 'Name not found'
			});
		} else if (req.body.branchId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Branch not found'
			});
		} else {
			Courses
				.getById(req.params.id)
				.then(function(course) {
					if (course == null) {
						res.status(400).json({
							success: false,
							response: 'Course ' + req.params.id + ' not found'
						});
					} else {
						Branches
							.getById(req.body.branchId)
							.then(function(branch) {
								if (branch == null) {
									res.status(400).json({
										success: false,
										response: 'Branch ' + req.body.branchId + ' not found'
									});
								} else {
									Courses
										.update(req.params.id, req.body.name, req.body.branchId)
										.then(function(course) {
											res.status(200).json({
												success: true,
												response: course
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
		Courses
			.getById(req.params.id)
			.then(function(course) {
				if (course == null) {
					res.status(400).json({
						success: false,
						response: 'Course ' + req.params.id + ' not found'
					});
				} else {
					Courses
						.delete(req.params.id)
						.then(function() {
							res.status(200).json({
								success: true,
								response: course
							});
						});
				}
			});
	}
};