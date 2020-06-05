const { Domains, Branches, Courses, Accounts, database } = require('../models');

async function createDomains() {
	await Domains.create('Architecture', 'architecture.jpg');
	await Domains.create('Code', 'code.jpg');
	await Domains.create('Economie', 'economie.jpg');
	await Domains.create('Gastronomie', 'gastronomie.jpg');
	await Domains.create('Géographie', 'geographie.jpg');
	await Domains.create('Histoire', 'histoire.jpg');
	await Domains.create('Médecine', 'medecine.jpg');
	await Domains.create('Peinture', 'peinture.jpg');
	await Domains.create('Politique', 'politique.jpg');
	await Domains.create('Sport', 'sport.jpg');
}

async function createBranches() {
	var branchId = 1;

	for (var domainId = 1; domainId <= 10; domainId++) {
		for (var i = 1; i <= 10; i++) {
			await Branches.create('domain' + domainId + '_branch' + branchId, 'branche.jpg', domainId);

			branchId++;
		}
	}
}

async function createCourses() {
	var courseId = 1;

	for (var branchId = 1; branchId <= 100; branchId++) {
		for (var i = 0; i < 10; i++) {
			await Courses.create('branch' + branchId + '_course' + courseId, 'cours.jpg', branchId, 1, 1, 0);
			
			courseId++;
		}
	}
}

database.afterBulkSync(async() => {
	await createDomains();
	console.log('1/4 Alimentated domains !');

	await createBranches();
	console.log('2/4 Alimentated branches !');

	await Accounts.create('professionnal@localhost', 'professionnal@localhost', null, 'professionnal@localhost', '9d520a3e49fd65b9288a6283779ab8e841bc5cbc25abdddaf452511e58f490b5', 'professionnal', true);
	console.log('3/4 Alimentated professionnal !');
	
	await createCourses();
	console.log('4/4 Alimentated courses !');

	//await Accounts.create('client@localhost', 'client@localhost', null, 'client@localhost', '62a1f575c3f3f1928ad535e69f840100bc1ef62eb385931a37a3e025d161d833', 'client', true);
});