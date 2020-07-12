const { Chats } = require('../models');
const session = require('../session');
const { json } = require('./utils');

module.exports = {
	getAll: async function(req, res) {
		const chats = await Chats.getAllByClass(req.params.id);

		res.json(json(true, chats));
	},

	post: async function(req, res) {
		await Chats.create(req.body.classId, session.accountId, req.body.value);

		res.json(json(true, 'OK'));
	}
};