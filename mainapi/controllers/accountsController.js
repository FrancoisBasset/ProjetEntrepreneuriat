const { Accounts } = require('../models');
const mailer = require('../mailer');
const { json } = require('./utils');

const session = require('../session');

module.exports = {
	getAll: async function(req, res) {
		const accounts = await Accounts.getAll();

		res.status(200).json(json(true, accounts));
	},

	get: async function(req, res) {
		const account = await Accounts.getById(session.accountId);	
		
		res.status(200).json(json(true, account));
	},

	connect: async function(req, res) {
		const { mail, hash } = req.body;

		var account = await Accounts.connect(mail, hash);
			
		if (account == null) {
			res.status(401).json(json(false, 'Identifiants incorrects'));
		} else {
			session.accountId = account.id;
			
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

	disconnect: function(req, res) {
		session.accountId = null;

		res.status(200).json(json(true, 'Disconnected'));
	},

	updatePassword: async function(req, res) {
		const response = await Accounts.updatePassword(session.accountId, req.body.oldPassword, req.body.newPassword);
		
		if (response[0] == 0) {
			res.json(json(false, 'L\'ancien mot de passe n\'est pas correct'));
		} else {
			res.json(json(true, 'ok'));
		}		
	},

	updateAccount: async function(req, res) {
		const account = await Accounts.updateAccount(session.accountId, req.body.firstName, req.body.lastName, req.body.organizationName, req.body.mail);
		
		res.json(json(true, account));
	},

	/*deleteAccount: function(req, res) {

	}*/
};