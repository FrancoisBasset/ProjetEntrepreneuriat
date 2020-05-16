const { Accounts, Clients, Courses, Chapters, Professionnals, Organizations, Operators, ClientsCourses } = require('../models');
const mailer = require('../mailer');
const { json } = require('./utils');

function getAccountType(type) {
	switch (type) {
	case 'client':
		return Clients;
	case 'professionnal':
		return Professionnals;
	case 'organization':
		return Organizations;
	case 'operator':
		return Operators;
	}
}

module.exports = {
	middlewareConnect: function(req, res, next) {
		if (req.body.mail != undefined && req.body.hash != undefined) {
			return next();
		}

		res.status(400).json(json(false, 'Paramètres manquants'));
	},

	middlewareCreateAccount: function(req, res, next) {
		if (req.body.mail != undefined && req.body.hash != undefined && req.body.type && req.body.permanent) {
			return next();
		}

		res.status(400).json(json(false, 'Paramètres manquants'));
	},

	middlewareFavorite: function(req, res, next) {
		if (req.body.favorite != undefined) {
			return next();
		}

		res.status(400).json(json(false, 'Paramètres manquants'));
	},

	getId: async function(req, res) {
		const { id } = req.params;

		var account = await Accounts.getById(id);
			
		if (account == null) {
			res.status(404).json(json(false, `Compte n°${id} non trouvé`));
		} else {
			res.status(200).json(json(true, account));
		}
	},

	connect: async function(req, res) {
		const { mail, hash } = req.body;

		var account = await Accounts.connect(mail, hash);
			
		if (account == null) {
			res.status(401).json(json(false, 'Identifiants incorrects'));
		} else {
			res.status(200).json(json(true, account));
		}
	},

	createAccount: async function(req, res) {
		const { mail, hash, type, permanent } = req.body;

		if (!['client', 'professionnal', 'organization', 'operator'].includes(type)) {
			res.status(400).json(json(false, `Le type ${type} incorrect`));
		} else if (await Accounts.exists(mail)) {
			res.status(400).json(json(false, `Le compte '${mail}' existe déjà`));
		} else {
			var account = await Accounts.create(mail, hash, type, permanent);
				
			const AccountType = getAccountType(type);

			account = await AccountType.create(account.id);
					
			res.status(201).json(json(true, account));

			mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', `Bienvenue chez nous ! Vous êtes un ${type}`);
		}
	},

	favorite: async function(req, res) {
		const { id, courseId } = req.params;
		const { favorite } = req.body;

		if (await Clients.getByAccountId(id) == undefined) {
			res.status(400).json(json(false, `Le client n°${id} n'existe pas`));
		} else if (await Courses.getBySectionId(courseId) == undefined) {
			res.status(400).json(json(false, `Le cours n°${courseId} n'existe pas`));
		} else {
			await ClientsCourses.favorite(id, courseId, favorite);
			
			const client = await Clients.getByAccountId(id);
			
			res.status(201).json(json(true, client));
		}
	},
	
	start: async function(req, res) {
		const { id, courseId } = req.params;

		if (await Clients.getByAccountId(id) == undefined) {
			res.status(400).json(json(false, `Le client n°${id} n'existe pas`));
		} else if (await Courses.getBySectionId(courseId) == undefined) {
			res.status(400).json(json(false, `Le cours n°${courseId} n'existe pas`));
		} else {
			if (req.params.chapterId == undefined) {
				await ClientsCourses.start(id, courseId, null);
			} else if (await Chapters.getBySectionId(req.params.chapterId) == undefined) {
				res.status(400).json(json(false, `Le chapitre n°${req.params.chapterId} n'existe pas`));
				return;
			} else {
				await ClientsCourses.start(id, courseId, req.params.chapterId);
			}

			const client = await Clients.getByAccountId(id);
			res.status(201).json(json(true, client));
		}
	}

	/*,

	updateAccount: function(req, res) {

	},

	deleteAccount: function(req, res) {

	}*/
};