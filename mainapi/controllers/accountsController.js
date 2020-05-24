const { Accounts, Courses, Chapters, ClientsCourses } = require('../models');
const mailer = require('../mailer');
const { json } = require('./utils');

module.exports = {
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

		if (await Accounts.exists(mail)) {
			res.status(409).json(json(false, `Le compte '${mail}' existe déjà`));
		} else {
			const account = await Accounts.create(mail, hash, type, permanent);
					
			res.status(201).json(json(true, account));

			mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', `Bienvenue chez nous ! Vous êtes un ${type}`);
		}
	},

	favorite: async function(req, res) {
		const { id, courseId } = req.params;
		const { favorite } = req.body;

		if (await Accounts.getById(id) == undefined) {
			res.status(400).json(json(false, `Le client n°${id} n'existe pas`));
		} else if (await Courses.getBySectionId(courseId) == undefined) {
			res.status(400).json(json(false, `Le cours n°${courseId} n'existe pas`));
		} else {
			await ClientsCourses.favorite(id, courseId, favorite);
			
			const client = await Accounts.getById(id);
			
			res.status(201).json(json(true, client));
		}
	},
	
	start: async function(req, res) {
		const { id, courseId } = req.params;

		if (await Accounts.getById(id) == undefined) {
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

			const client = await Accounts.getById(id);
			res.status(201).json(json(true, client));
		}
	}

	/*,

	updateAccount: function(req, res) {

	},

	deleteAccount: function(req, res) {

	}*/
};