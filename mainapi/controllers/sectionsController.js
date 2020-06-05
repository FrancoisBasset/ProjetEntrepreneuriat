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

async function handleDomains(id, name, image) {
	var section, response;

	if (await Domains.exists(name)) {
		response = `Le domaine '${name}' existe déjà`;
	} else {
		if (id == undefined) {
			section = await Domains.create(name, image.filename);
		} else {
			section = await Domains.update(id, name, image.filename);
		}
	}

	return {
		section: section,
		response: response
	};
}

async function handleBranches(id, name, image, domainId) {
	var section, response;

	if (await Domains.getById(domainId) == null) {
		response = `Le domaine '${domainId}' n'existe pas`;
	} else if (await Branches.exists(name, domainId)) {
		response = `La branche '${name}' existe déjà`;
	} else {
		if (id == undefined) {
			section = await Branches.create(name, image.filename, domainId);
		} else {
			section = await Branches.update(id, name, image.filename, domainId);
		}
	}

	return {
		section: section,
		response: response
	};
}

async function handleCourses(id, name, image, branchId, authorId, difficulty, objectives, paying) {
	const account = await Accounts.getById(authorId);

	var section, response;

	if (await Branches.getById(branchId) == null) {
		response = `La branche '${branchId}' n'existe pas`;
	} else if (account == null) {
		response = `L'auteur n°'${authorId}' n'existe pas`;
	} else if (await Courses.exists(name, branchId, authorId)) {
		response = `Le cours '${name}' existe déjà`;
	} else if (account.type != 'professionnal') {
		response = `Le compte n°${authorId} ne peut pas créer un cours`;
	} else {
		if (id == undefined) {
			section = await Courses.create(name, image.filename, branchId, authorId, difficulty, objectives, paying);
		} else {
			section = await Courses.update(id, name, image.filename, branchId, authorId, difficulty, objectives, paying);
		}
	}

	return {
		section: section,
		response: response
	};
}

async function handleChapters(id, name, image, index, courseId) {
	var section, response;

	if (await Courses.getById(courseId) == undefined) {
		response = `Le cours ${courseId} n'existe pas`;
	} else if (parseInt(index) < 0) {
		response = 'L\'index doit être égal ou supérieur à 0';
	} else if (await Chapters.exists(name, index, courseId)) {
		response = `Le chapitre ${name} existe déjà`;
	} else {
		if (id == undefined) {
			section = await Chapters.create(name, image.filename, index, courseId);
		} else {
			section = await Chapters.update(id, name, image.filename, index);
		}
	}

	return {
		section: section,
		response: response
	};
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

	postPut: async function(req, res) {
		const { id, type } = req.params;
		const { name } = req.body;
		const image = req.file;

		var section, response;

		switch (type) {
		case 'domains':
			({section, response} = await handleDomains(id, name, image));
			break;
		case 'branches':
			({section, response} = await handleBranches(id, name, image, req.body.domainId));
			break;
		case 'courses':
			({section, response} = await handleCourses(id, name, image, req.body.branchId, req.body.authorId, req.body.difficulty, req.body.objectives, req.body.paying));
			break;
		case 'chapters':
			({section, response} = await handleChapters(id, name, image, req.body.index, req.body.courseId));
			break;
		}
		
		if (section != null) {
			res.status(201).json(json(true, section));
		} else {
			res.status(400).json(json(false, response));
		}
	}
};