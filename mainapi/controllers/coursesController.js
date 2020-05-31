const { Courses, Chapters, ClientsCourses } = require('../models');
const { json } = require('./utils');

async function handleFavorite(req, res, favorite) {
	const { id } = req.params;
	var account = req.session.account;

	if (await Courses.getById(id) == undefined) {
		res.status(400).json(json(false, `Le cours n°${id} n'existe pas`));
	} else if (account.type != 'client') {
		res.status(400).json(json(false, `Un ${account.type} ne peut pas avoir de cours en favoris`));
	} else {
		account = await ClientsCourses.favorite(account.id, id, favorite);
		res.status(201).json(json(true, account));
	}
}

module.exports = {
	addFavorite: async function(req, res) {
		await handleFavorite(req, res, true);
	},

	deleteFavorite: async function(req, res) {
		await handleFavorite(req, res, false);
	},

	start: async function(req, res) {
		const { id, chapterId } = req.params;
		var account = req.session.account;

		if (await Courses.getById(id) == undefined) {
			res.status(400).json(json(false, `Le cours n°${id} n'existe pas`));
		} else if (chapterId != undefined && await Chapters.getById(chapterId) == undefined) {
			res.status(400).json(json(false, `Le chapitre n°${chapterId} n'existe pas`));
		} else if (account.type != 'client') {
			res.status(400).json(json(false, `Un ${account.type} ne peut pas démarrer un cours`));
		} else {
			account = await ClientsCourses.start(account.id, id, chapterId);
			res.status(201).json(json(true, account));
		}
	}
};