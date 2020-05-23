const { Sections, Domains, Branches, Courses, Accounts, Professionnals, database } = require('../models');

async function createDomains() {
	await Sections.create('domain', 'Architecture', 'architecture.jpg');
	await Domains.create(1);

	await Sections.create('domain', 'Code', 'code.jpg');
	await Domains.create(2);

	await Sections.create('domain', 'Economie', 'economie.jpg');
	await Domains.create(3);

	await Sections.create('domain', 'Gastronomie', 'gastronomie.jpg');
	await Domains.create(4);

	await Sections.create('domain', 'Géographie', 'geographie.jpg');
	await Domains.create(5);

	await Sections.create('domain', 'Histoire', 'histoire.jpg');
	await Domains.create(6);

	await Sections.create('domain', 'Médecine', 'medecine.jpg');
	await Domains.create(7);

	await Sections.create('domain', 'Peinture', 'peinture.jpg');
	await Domains.create(8);

	await Sections.create('domain', 'Politique', 'politique.jpg');
	await Domains.create(9);

	await Sections.create('domain', 'Sport', 'sport.jpg');
	await Domains.create(10);
}

async function createBranches() {
	var branchId = 11;

	for (var domainId = 1; domainId <= 10; domainId++) {
		for (var i = 0; i < 10; i++) {
			await Sections.create('branch', 'branch' + domainId + '_' + branchId, 'branche.jpg');
			await Branches.create(branchId, domainId);

			branchId++;
		}
	}
}

async function createCourses() {
	var courseId = 111;

	for (var branchId = 11; branchId <= 110; branchId++) {
		for (var i = 0; i < 10; i++) {
			await Sections.create('course', 'course' + branchId + '_' + courseId, 'cours.jpg');
			await Courses.create(courseId, branchId, 1);

			courseId++;
		}
	}
}

database.afterBulkSync(async() => {
	await createDomains();
	await createBranches();

	await Accounts.create('professionnal@localhost', 'hash', 'professionnal', true);
	await Professionnals.create(1);

	await createCourses();
});