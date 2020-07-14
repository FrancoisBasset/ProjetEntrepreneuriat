const { Domains, Branches, Courses, Chapters, Accounts, Certifications, Pages, database, ClientsCourses, Notifications, Classes } = require('../models');

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

database.afterBulkSync(async() => {
	const l = 13;
	var i = 0;

	await Accounts.create('El Professor', 'Sananes', null, 'pro@localhost', '07ed400759a0f606a8b5bfa84712aabe7d1b1c45cb6536c8a5727446b6647b84', 'professionnal', true);
	console.log(`${++i}/${l} professionnal !`);

	await Accounts.create('François', 'Basset', null, 'client@localhost', '948fe603f61dc036b5c596dc09fe3ce3f3d30dc90f024c85f3c82db2ccab679d', 'client', true);
	console.log(`${++i}/${l} client !`);

	await Accounts.create('operator@ecoleconfinee', 'operator@ecoleconfinee', null, 'operator@ecoleconfinee', '83ad68614748987041773b9a92229d5b3d213f2cbb3e1dfb988ad5b7043a6800', 'operator', true);
	console.log(`${++i}/${l} operator !`);

	await Accounts.create('Ecole', 'ESGI', null, 'org@localhost', 'e87cb45c05ad389d58904ea398345c24b50f46c15d412d0f671e66b766247d39', 'organization', true);
	console.log(`${++i}/${l} organization !`);

	await createDomains();
	console.log(`${++i}/${l} domains !`);

	await Branches.create('Europe', 'branche.jpg', 5);
	await Branches.create('Afrique', 'branche.jpg', 5);
	await Branches.create('Asie', 'branche.jpg', 5);
	await Branches.create('Oceanie', 'branche.jpg', 5);

	await Branches.create('Préhistoire', 'branche.jpg', 6);
	await Branches.create('Antiquité', 'branche.jpg', 6);
	await Branches.create('Moyen-Âge', 'branche.jpg', 6);
	await Branches.create('Renaissance', 'branche.jpg', 6);
	await Branches.create('Temps Modernes', 'branche.jpg', 6);
	console.log(`${++i}/${l} branches !`);

	await Courses.create('France', 'france.jpg', 1, 1, 1, '', 0);
	await Courses.create('Espagne', 'espagne.jpg', 1, 1, 2, '', 0);
	await Courses.create('Allemagne', 'allemagne.jpg', 1, 1, 3, '', 0);
	await Courses.create('Royaume-Uni', 'uk.jpg', 1, 1, 4, '', 0);
	await Courses.create('Italie', 'italie.jpg', 1, 1, 5, '', 0);
	console.log(`${++i}/${l} courses !`);

	await Chapters.create('Introduction', 0, 1);
	await Chapters.create('Géographie', 1, 1);
	await Chapters.create('Histoire', 2, 1);
	await Chapters.create('Population', 3, 1);
	await Chapters.create('Économie', 4, 1);
	await Chapters.create('Culture', 5, 1);
	console.log(`${++i}/${l} chapters !`);

	await ClientsCourses.start(2, 1, null);
	console.log(`${++i}/${l} clients courses !`);

	await Pages.create(0, 1);
	await Pages.create(1, 1);
	await Pages.create(2, 1);
	await Pages.create(0, 2);
	await Pages.create(1, 2);
	await Pages.create(2, 2);
	await Pages.create(0, 3);
	await Pages.create(1, 3);
	await Pages.create(2, 3);
	await Pages.create(3, 3);
	await Pages.create(0, 4);
	await Pages.create(1, 4);
	await Pages.create(2, 4);
	await Pages.create(0, 5);
	await Pages.create(1, 5);
	await Pages.create(2, 5);
	await Pages.create(0, 6);
	await Pages.create(1, 6);
	await Pages.create(2, 6);
	console.log(`${++i}/${l} pages !`);

	await Certifications.create('Europe', 1, [1, 2, 3, 4, 5]);
	await Certifications.create('Europe du sud', 1, [2, 5]);
	console.log(`${++i}/${l} certifications !`);

	await Notifications.create('Bonne année', 'Bonne année à tous, on espère que cette année sera pleine de reussite !');
	await Notifications.create('Joyeux Noël', 'Joyeux Noël, profitez de vos proches !');
	await Notifications.create('Golang', 'Cours sur Golang disponible !');
	console.log(`${++i}/${l} notifications !`);

	await Classes.create(1, 'Node.Js', 'Cours ludique sur Node.Js', false, 5.00, 'Chat;Microphone;Caméra;Partage écran;Utilisateurs;');
	await Classes.plan(1, '2020-08-08', '20:00:00', '23:59:59');

	await Classes.create(1, 'PHP', 'Cours ludique sur PHP', false, 15.00, 'Chat;Microphone;Caméra;Partage écran;Utilisateurs;');
	await Classes.plan(2, '2020-08-08', '20:00:00', '23:59:59');

	await Classes.create(1, 'Parachutisme', 'Cours pratique sur le parachutisme', false, 200.00, 'Chat;Microphone;Caméra;Partage écran;Utilisateurs;');
	await Classes.plan(3, '2020-08-08', '20:00:00', '23:59:59');
	console.log(`${++i}/${l} classes !`);
});