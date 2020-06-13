const { Domains, Branches, Courses, Chapters, Accounts, Certifications, Pages, database } = require('../models');

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
		for (var i = 1; i <= 5; i++) {
			await Branches.create('domain' + domainId + '_branch' + branchId, 'branche.jpg', domainId);

			branchId++;
		}
	}
}

async function createCourses() {
	var courseId = 1;

	for (var branchId = 1; branchId <= 50; branchId++) {
		for (var i = 0; i < 5; i++) {
			await Courses.create('branch' + branchId + '_course' + courseId, 'cours.jpg', branchId, 1, 1, 'Apprendre;Savoir;Connaitre', 1);
			
			courseId++;
		}
	}
}

database.afterBulkSync(async() => {
	const l = 6;
	var i = 0;

	await Accounts.create('professionnal@localhost', 'professionnal@localhost', null, 'professionnal@localhost', '9d520a3e49fd65b9288a6283779ab8e841bc5cbc25abdddaf452511e58f490b5', 'professionnal', true);
	console.log(`${++i}/${l} professionnal !`);

	await createDomains();
	console.log(`${++i}/${l} domains !`);

	//await createBranches();
	await Branches.create('Europe', 'branche.jpg', 5);
	console.log(`${++i}/${l} branches !`);

	//await createCourses();
	await Courses.create('France', 'cours.jpg', 1, 1, 1, '', 0);
	console.log(`${++i}/${l} courses !`);

	await Chapters.create('Introduction', 'chapitre.jpg', 0, 1);
	await Chapters.create('Histoire', 'chapitre.jpg', 1, 1);
	await Chapters.create('Paysages', 'chapitre.jpg', 2, 1);
	await Chapters.create('Population', 'chapitre.jpg', 3, 1);

	console.log(`${++i}/${l} chapters !`);

	/*for (var c = 1; c <= 4; c++) {
		for (var p = 1; p <= 5; p++) {
			await Pages.create(p - 1, c);
		}
	}*/

	await Pages.create(0, 1);
	await Pages.create(1, 1);
	await Pages.create(2, 1);
	console.log(`${++i}/${l} pages !`);

	/*await Chapters.create('Chapitre', 'chapitre.jpg', 0, 1);
	console.log('5/7 Alimentated chapters !');*/
	
	/*await Accounts.create('operator@ecoleconfinee', 'operator@ecoleconfinee', null, 'operator@ecoleconfinee', '83ad68614748987041773b9a92229d5b3d213f2cbb3e1dfb988ad5b7043a6800', 'operator', true);
	console.log('6/7 Alimented operator !');*/
	
	/*await Certifications.create('Moyen-Age 1', 1, [1, 2]);
	await Certifications.create('Moyen-Age 2', 1, [3, 4]);
	await Certifications.create('Moyen-Age 3', 1, [5, 6]);
	console.log('7/7 operator !');*/

	//await Accounts.create('client@localhost', 'client@localhost', null, 'client@localhost', '62a1f575c3f3f1928ad535e69f840100bc1ef62eb385931a37a3e025d161d833', 'client', true);
});