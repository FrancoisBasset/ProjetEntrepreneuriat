const { Classes, Accounts } = require('../models');
const session = require('../session');
const { json } = require('./utils');

module.exports = {
	getAll: async function(req, res) {
		const classes = await Classes.getAll();

		res.json(json(true, classes));
	},

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
	},

	pay: async function(req, res) {
		const classe = await Classes.getById(req.params.id);
		var account = await Accounts.getById(session.accountId);

		if (classe == null) {
			res.json(json(false, `La classe virtuelle n°${req.params.id} n'existe pas`));
		} else if (account.card.balance < classe.price) {
			const last = classe.price - account.card.balance;
			res.json(json(false, `Il vous manque ${last} €`));
		} else if (await Classes.exists(req.params.id, account.id)) {
			res.json(json(false, 'Le client a déjà cette classe'));
		} else {
			await Classes.pay(req.params.id, account.id);

			account = await Accounts.getById(session.accountId);
			
			res.json(json(true, account));
		}
	}
};