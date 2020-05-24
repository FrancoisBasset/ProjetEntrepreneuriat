const { Accounts, Certifications, database } = require('../models');

database.afterBulkSync(async () => {
	const p = await Accounts.create('professionnal@localhost', 'hash', 'professionnal', true);

	const c = await Certifications.create('Moyen-Âge', p.id);

	console.log(p.dataValues);
	console.log(c.dataValues);
});