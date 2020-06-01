const { Accounts } = require('../models');
const mailer = require('../mailer');
const { json } = require('./utils');

module.exports = {
	get: async function(req, res) {
		req.session.account = await Accounts.getById(req.session.account.id);
		
		res.status(200).json(json(true, req.session.account));
	},

	connect: async function(req, res) {
		const { mail, hash } = req.body;

		var account = await Accounts.connect(mail, hash);
			
		if (account == null) {
			res.status(401).json(json(false, 'Identifiants incorrects'));
		} else {
			req.session.account = account;
			
			res.status(200).json(json(true, account));
		}
	},

	createAccount: async function(req, res) {
		const { firstName, lastName, organizationName, mail, hash, type, permanent } = req.body;		

		if (await Accounts.exists(mail)) {
			res.status(409).json(json(false, `Le compte '${mail}' existe déjà`));
		} else {
			const mailerResponse = await mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', `Bienvenue chez nous ! Vous êtes un ${type}`);

			if (mailerResponse) {
				const account = await Accounts.create(firstName, lastName, organizationName, mail, hash, type, permanent);
				res.status(201).json(json(true, account));
			} else {
				res.status(500).json(json(false, 'Impossible d\'envoyer le mail de confirmation, êtes-vous sûr de cette adresse mail ?'));
			}
		}
	},

	/*disconnect: function(req, res) {
		req.session.account = null;
	}*/

	/*,

	updateAccount: function(req, res) {

	},

	deleteAccount: function(req, res) {

	}*/
};