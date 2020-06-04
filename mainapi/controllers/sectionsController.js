const { Domains, Branches, Courses, Chapters, Accounts } = require('../models');
const { json } = require('./utils');

function getSectionType(type) {
	switch (type) {
	case 'domains':
		return Domains;
	case 'branches':
		return Branches;
	case 'courses':
		return Courses;
	case 'chapters':
		return Chapters;
	}
}

module.exports = {
	get: async function(req, res) {
		const { type } = req.params;
		const { search } = req.query;
		
		const SectionType = getSectionType(type);
		var sections;

		if (search == undefined) {
			sections = await SectionType.getAll();
		} else {
			sections = await SectionType.getByName(search);
		}

		res.status(200).json(json(true, sections));
	},

	getId: async function(req, res) {
		const { type } = req.params;
		const { id } = req.params;

		const SectionType = getSectionType(type);
		var section = await SectionType.getById(id);

		if (section == null) {
			res.status(404).json(json(false, 'Section non trouvé'));
		} else {
			res.status(200).json(json(true, section));
		}
	},

	post: async function(req, res) {
		const { type } = req.params;
		const { name } = req.body;
		const image = req.file;

		var response;
		var section;

		switch (type) {
		case 'domains':
			if (await Domains.exists(name)) {
				response = `Le domaine '${name}' existe déjà`;
			} else {
				section = await Domains.create(name, image.filename);
			}
			break;
		case 'branches':
			if (await Domains.getById(req.body.domainId) == null) {
				response = `Le domaine '${req.body.domainId}' n'existe pas`;
			} else if (await Branches.exists(name, req.body.domainId)) {
				response = `La branche '${name}' existe déjà`;
			} else {
				section = await Branches.create(name, image.filename, req.body.domainId);
			}
			break;
		case 'courses':
			// eslint-disable-next-line no-case-declarations
			const account = await Accounts.getById(req.body.authorId);

			if (await Branches.getById(req.body.branchId) == null) {
				response = `La branche '${req.body.branchId}' n'existe pas`;
			} else if (account == null) {
				response = `L'auteur n°'${req.body.authorId}' n'existe pas`;
			} else if (await Courses.exists(name, req.body.branchId, req.body.authorId)) {
				response = `Le cours '${name}' existe déjà`;
			} else if (account.type != 'professionnal') {
				response = `Le compte n°${req.body.authorId} ne peut pas créer un cours`;
			} else {
				section = await Courses.create(name, image.filename, req.body.branchId, req.body.authorId, req.body.difficulty, req.body.objectives, req.body.paying);
			}
			break;
		case 'chapters':
			if (await Courses.getById(req.body.courseId) == undefined) {
				response = `Le cours ${req.body.courseId} n'existe pas`;
			} else if (parseInt(req.body.index) < 0) {
				response = 'L\'index doit être égal ou supérieur à 0';
			} else if (await Chapters.exists(name, req.body.index, req.body.courseId)) {
				response = `Le chapitre ${name} existe déjà`;
			} else {
				section = await Chapters.create(name, image.filename, req.body.index, req.body.courseId);
			}
			break;
		}
		
		if (section != null) {
			res.status(201).json(json(true, section));
		} else {
			res.status(400).json(json(false, response));
		}
	}
};