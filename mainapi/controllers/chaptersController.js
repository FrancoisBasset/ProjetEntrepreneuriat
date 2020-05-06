const { Courses, Chapters } = require('../models');

module.exports = {
	// OK
	get: function(req, res) {
		var promise;

		if (req.query.search != undefined) {
			promise = Chapters.getByName(req.query.search);
		} else {
			promise = Chapters.getAll();
		}

		promise.then(function(chapters) {
			res.status(200).json({
				success: true,
				response: chapters
			});
		});
	},

	// OK
	getId: function(req, res) {
		Chapters
			.getById(req.params.id)
			.then(function(chapter) {
				if (chapter == null) {
					res.status(404).json({
						success: false,
						response: 'Chapter ' + req.params.id + ' not found'
					});
				} else {
					res.status(200).json({
						success: true,
						response: chapter
					});
				}				
			});
	},

	// OK
	post: function(req, res) {
		if (req.body.index == undefined) {
			res.status(400).json({
				success: false,
				response: 'Index not found'
			});
		} else if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else if (req.body.courseId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Course not found'
			});
		} else {
			Chapters.exists(req.body.name, req.body.index, req.body.courseId)
				.then(function(exists) {
					if (exists) {
						res.status(400).json({
							success: false,
							response: 'Chapter ' + req.body.name + ' with course ' + req.body.courseId + ' already exists'
						});
					} else {
						Courses
							.getById(req.body.courseId)
							.then(function(course) {
								if (course == null) {
									res.status(400).json({
										success: false,
										response: 'Course ' + req.body.courseId + ' not found'
									});
								} else {
									Chapters
										.create(req.body.name, req.body.index, req.body.courseId)
										.then(function(chapter) {
											res.status(201).json({
												success: true,
												response: chapter
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
		if (req.body.index == undefined) {
			res.status(400).json({
				success: false,
				response: 'Index not found'
			});
		} else if (req.body.name == undefined) {
			res.status(400).json({
				success: false,
				response: 'Name not found'
			});
		} else if (req.body.courseId == undefined) {
			res.status(400).json({
				success: false,
				response: 'Course not found'
			});
		} else {
			Chapters
				.getById(req.params.id)
				.then(function(chapter) {
					if (chapter == null) {
						res.status(400).json({
							success: false,
							response: 'Chapter ' + req.params.id + ' not found'
						});
					} else {
						Courses
							.getById(req.body.courseId)
							.then(function(course) {
								if (course == null) {
									res.status(400).json({
										success: false,
										response: 'Course ' + req.body.courseId + ' not found'
									});
								} else {
									Chapters
										.update(req.params.id, req.body.name, req.body.index, req.body.courseId)
										.then(function(chapter) {
											res.status(200).json({
												success: true,
												response: chapter
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
		Chapters
			.getById(req.params.id)
			.then(function(chapter) {
				if (chapter == null) {
					res.status(400).json({
						success: false,
						response: 'Chapter ' + req.params.id + ' not found'
					});
				} else {
					Chapters
						.delete(req.params.id)
						.then(function() {
							res.status(200).json({
								success: true,
								response: chapter
							});
						});
				}
			});		
	}
};