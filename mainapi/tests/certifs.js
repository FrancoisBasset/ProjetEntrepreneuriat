const { Accounts, Certifications, Sections, Domains, Branches, Courses, database } = require('../models');

database.afterBulkSync(async () => {
	await Accounts.create('professionnal@localhost', 'hash', 'professionnal', true);
	const authorId = 1;

	await Sections.create('domain', 'Histoire', 'Histoire.jpg');
	await Domains.create(1);

	await Sections.create('branch', 'Moyen-Âge', 'branche.jpg');
	await Branches.create(2, 1);
	const branchId = 2;

	await Sections.create('course', 'La guerre de 100 ans', 'Cours.jpg');
	await Courses.create(3, branchId, authorId);

	await Sections.create('course', 'Les croisades', 'Cours.jpg');
	await Courses.create(4, branchId, authorId);

	await Sections.create('course', 'La féodalité', 'Cours.jpg');
	await Courses.create(5, branchId, authorId);

	await Sections.create('course', 'La peste noire', 'Cours.jpg');
	await Courses.create(6, branchId, authorId);

	await Certifications.create('Moyen-Âge 1', authorId, [3, 4]);
	await Certifications.create('Moyen-Âge 2', authorId, [5, 6]);
});