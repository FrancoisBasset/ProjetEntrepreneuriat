const { Sections, Domains, Branches, Courses, Chapters, Professionnals } = require('../models');
const { json } = require('./utils');

function getSectionType(type) {
	switch (type) {
	case 'domain':
		return Domains;
	case 'branch':
		return Branches;
	case 'course':
		return Courses;
	case 'chapter':
		return Chapters;
	}
}

module.exports = {
	get: async function(req, res) {
		const { search, type } = req.query;
		
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
		const { id } = req.params;

		var section = await Sections.getById(id);

		if (section == null) {
			res.status(404).json(json(false, 'Section non trouvé'));
		} else {
			const SectionsType = getSectionType(section.type);

			section = await SectionsType.getBySectionId(section.id);

			res.status(200).json(json(true, section));
		}
	},

	post: async function(req, res) {
		const { name, type } = req.body;
		const image = req.file;		

		var ok = false;
		var response;

		switch (type) {
		case 'domain':
			if (await Domains.exists(name)) {
				response = `Le domaine '${name}' existe déjà`;
			} else {
				ok = true;
				var section = await Sections.create(type, name, image.filename);
				section = await Domains.create(section.id);
			}
			break;
		case 'branch':
			if (await Domains.getBySectionId(req.body.domainId) == null) {
				response = `Domaine '${req.body.domainId}' non trouvé`;
			} else if (await Branches.exists(name, req.body.domainId)) {
				response = `Branche '${name}' existe déjà`;
			} else {
				ok = true;
				section = await Sections.create(type, name, image.filename);
				section = await Branches.create(section.id, req.body.domainId);
			}
			break;
		case 'course':
			if (await Branches.getBySectionId(req.body.branchId) == null) {
				response = `La branche '${req.body.branchId}' n'existe pas`;
			} else if (await Professionnals.getByAccountId(req.body.authorId) == null) {
				response = `L'auteur '${req.body.authorId}' n'existe pas`;
			} else if (await Courses.exists(name, req.body.branchId, req.body.authorId)) {
				response = `Le cours '${name}' existe déjà`;
			} else {
				ok = true;
				section = await Sections.create(type, name, image.filename);
				section = await Courses.create(section.id, req.body.branchId, req.body.authorId);
			}
			break;
		case 'chapter':
			if (await Courses.getBySectionId(req.body.courseId) == undefined) {
				response = `Le cours ${req.body.courseId} n'existe pas`;
			} else if (parseInt(req.body.index) < 0) {
				response = 'L\'index doit être égal ou supérieur à 0';
			} else if (await Chapters.exists(name, req.body.index, req.body.courseId)) {
				response = `Le chapitre ${name} existe déjà`;
			} else {
				ok = true;
				section = await Sections.create(type, name, image.filename);
				section = await Chapters.create(section.id, req.body.index, req.body.courseId);
			}
			break;
		}
		
		if (ok) {
			res.status(201).json(json(true, section));
		} else {
			res.status(400).json(json(false, response));
		}
	}
};