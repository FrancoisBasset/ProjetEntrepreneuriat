const { Classes } = require('../models');
const session = require('../session');
const { json } = require('./utils');

module.exports = {
	post: async function(req, res) {
		const classe = await Classes.create(session.accountId, req.body.name, req.body.description, req.body.public, req.body.price, req.body.fonctionnalities);

		res.json(json(true, classe));
	}
};