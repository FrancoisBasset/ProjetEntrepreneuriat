const { database, Domains, Branches, Courses, Chapters, Accounts } = require('../models');

database.afterBulkSync(async function() {
	await Domains.create('Histoire', 'Histoire.jpg');
	await Branches.create('Moyen-Âge', 'branche.jpg', 1);

	await Accounts.create('professionnal@localhost', 'hash', 'professionnal', true);
	await Courses.create('La guerre de 100 ans', 'cours.jpg', 1, 1);

	await Accounts.create('client@localhost', 'hash', 'client', true);
	
	await Chapters.create('Jeanne d\'Arc', 'chapitre.jpg', 0, 1);
});