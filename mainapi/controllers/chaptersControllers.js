const { Chapters } = require('../models');
const { json } = require('./utils');

module.exports = {
	quickedit: async function(req, res) {
		const { id } = req.params;
		const { name, index } = req.body;

		if (await Chapters.getById(id) == null) {
			res.status(400).json(json(false, `Le chapitre n°${id} n'existe pas`));
		} else {
			const chapter = await Chapters.update(id, name, index);

			res.status(200).json(json(true, chapter));
		}
	}
};