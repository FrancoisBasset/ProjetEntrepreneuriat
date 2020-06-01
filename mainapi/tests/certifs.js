const { Accounts, Certifications, Domains, Branches, Courses, database } = require('../models');

database.afterBulkSync(async () => {
	await Accounts.create('P', 'N', null, 'professionnal@localhost', 'hash', 'professionnal', true);

	await Domains.create('Histoire', 'Histoire.jpg');

	await Branches.create('Moyen-Âge', 'branche.jpg', 1);

	await Courses.create('La guerre de 100 ans', 'Cours.jpg', 1, 1);
	await Courses.create('Les croisades', 'Cours.jpg', 1, 1);
	await Courses.create('La féodalité', 'Cours.jpg', 1, 1);
	await Courses.create('La peste noire', 'Cours.jpg', 1, 1);

	await Certifications.create('Moyen-Âge 1', 1, [1, 2]);
	await Certifications.create('Moyen-Âge 2', 1, [3, 4]);
});