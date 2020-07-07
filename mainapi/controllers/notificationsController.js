const { Notifications } = require('../models');
const { json } = require('./utils');

module.exports = {
	get: async function(req, res) {
		const notifications = await Notifications.getAll();

		res.json(json(true, notifications));
	},
	post: async function(req, res) {
		if (await Notifications.getByName(req.body.name) != null) {
			res.send(json(false, `La notification '${req.body.name}' existe déjà`));
		} else {
			const notification = await Notifications.create(req.body.name, req.body.message);

			res.send(json(true, notification));
		}
	},
	put: async function(req, res) {
		if (await Notifications.getById(req.params.id) == null) {
			res.send(json(false, `La notification n°${req.params.id} n'existe pas'`));
		} else if (await Notifications.getByName(req.body.name) != null && (await Notifications.getByName(req.body.name)).id != req.params.id) {
			res.send(json(false, `La notification '${req.body.name}' existe déjà`));
		} else {
			const notification = await Notifications.update(req.params.id, req.body.name, req.body.message);

			res.send(json(true, notification));
		}
	},
	send: async function(req, res) {
		if (await Notifications.getById(req.params.id) == null) {
			res.send(json(false, `La notification n°${req.params.id} n'existe pas'`));
		} else {
			const notification = await Notifications.send(req.params.id);

			//send to all

			res.send(json(true, notification));
		}
	}
};