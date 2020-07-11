const { Classes } = require('../models');
const session = require('../session');
const { json } = require('./utils');

module.exports = {
	getById: async function(req, res) {
		const classe = await Classes.getById(req.params.id);

		res.json(json(true, classe));
	},

	post: async function(req, res) {
		const classe = await Classes.create(session.accountId, req.body.name, req.body.description, req.body.private, req.body.price, req.body.fonctionnalities);

		res.json(json(true, classe));
	},

	put: async function(req, res) {
		const classe = await Classes.update(req.params.id, req.body.name, req.body.description, req.body.private, req.body.price, req.body.fonctionnalities);

		res.json(json(true, classe));
	},

	plan: async function(req, res) {
		const classe = await Classes.plan(req.params.id, req.body.date, req.body.beginHour, req.body.endHour);

		res.json(json(true, classe));
	}
};