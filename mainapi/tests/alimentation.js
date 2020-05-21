const { Sections, Domains, database } = require('../models');

async function start() {
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

database.afterBulkSync(async() => {
	start();
});