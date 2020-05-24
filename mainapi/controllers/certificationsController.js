const { Accounts, Certifications, Courses } = require('../models');
const { json } = require('./utils');

module.exports = {
	get: async function(req, res) {
		var certifications;

		if (req.query.search == undefined) {
			certifications = await Certifications.getAll();
		} else {
			certifications = await Certifications.getByName(req.query.search);
		}
		
		res.status(200).json(json(true, certifications));
	},

	post: async function(req, res) {
		const { name, claimantId, coursesId } = req.body;

		if (Accounts.getById(claimantId) == null) {
			res.status(400).json(json(false, `Le compte n°${claimantId} n'existe pas`));
		} else if (await Certifications.exists(name)) {
			res.status(400).json(json(false, `La certification '${name}' existe déjà`));
		} else {
			for (const courseId of coursesId) {
				if (await Courses.getBySectionId(courseId) == null) {
					res.status(400).json(json(false, `Le cours n°${courseId} n'existe pas`));
					return;
				}
			}

			const certification = await Certifications.create(name, claimantId, coursesId);
			res.status(201).json(json(true, certification));
		}
	}
};