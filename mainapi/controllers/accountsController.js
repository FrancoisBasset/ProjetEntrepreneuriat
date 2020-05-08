const { Accounts, Clients, Professionnals, Organizations, Operators } = require('../models');
const mailer = require('../mailer');

module.exports = {
	connect: function(req, res) {
		const { mail, hash } = req.body;
		var missing = hash == undefined ? 'Hash' : '';
		missing = mail == undefined ? 'Mail' : missing;

		if (missing != '') {
			res.status(400).json({
				success: false,
				response: missing + ' missing'
			});
		} else {
			Accounts
				.connect(mail, hash)
				.then(function(account) {
					if (account == null) {
						res.status(401).json({
							success: false,
							response: 'Incorrect login'
						});
					} else {
						switch (account.type) {
						case 'client':
							Clients
								.getByAccountId(account.id)
								.then(function(client) {
									res.status(200).json({
										success: true,
										response: client
									});
								});
							break;
						case 'professionnal':
							Professionnals
								.getByAccountId(account.id)
								.then(function(professionnal) {
									res.status(200).json({
										success: true,
										response: professionnal
									});
								});
							break;
						case 'organization':
							Organizations
								.getByAccountId(account.id)
								.then(function(organization) {
									res.status(200).json({
										success: true,
										response: organization
									});
								});
							break;
						case 'operator':
							Operators
								.getByAccountId(account.id)
								.then(function(operator) {
									res.status(200).json({
										success: true,
										response: operator
									});
								});
							break;								
						}
					}
				});
		}
	},

	createAccount: function(req, res) {
		const { mail, hash, type, permanent } = req.body;
		var missing = permanent == undefined ? 'Permanent' : '';
		missing = type == undefined ? 'Type' : missing;
		missing = hash == undefined ? 'Hash' : missing;
		missing = mail == undefined ? 'Mail': missing;

		if (missing != '') {
			res.status(400).json({
				success: false,
				response: missing + ' missing'
			});
		} else {
			Accounts
				.getByMail(mail)
				.then(function(account) {
					if (account != null) {
						res.status(400).json({
							success: false,
							response: 'Account ' + mail + ' already exists'
						});
					} else {
						if (!['client', 'professionnal', 'organization', 'operator'].includes(type)) {
							res.status(400).json({
								success: false,
								response: 'Type ' + type + ' is incorrect'
							});
						} else {
							Accounts
								.create(mail, hash, type, permanent)
								.then(function(account) {
									switch (type) {
									case 'client':
										Clients
											.create(account.id)
											.then(function(client) {
												res.status(201).json({
													success: true,
													response: client
												});

												mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', 'Bienvenue chez nous ! Vous êtes un ' + account.type);
											});
										break;
									case 'professionnal':
										Professionnals
											.create(account.id)
											.then(function(professionnal) {
												res.status(201).json({
													success: true,
													response: professionnal
												});

												mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', 'Bienvenue chez nous ! Vous êtes un ' + account.type);
											});
										break;
									case 'organization':
										Organizations
											.create(account.id)
											.then(function(organization) {
												res.status(201).json({
													success: true,
													response: organization
												});

												mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', 'Bienvenue chez nous ! Vous êtes un ' + account.type);
											});
										break;
									case 'operator':
										Operators
											.create(account.id)
											.then(function(operator) {
												res.status(201).json({
													success: true,
													response: operator
												});

												mailer.sendMail('noreply@ecoleconfinee', mail, 'Bienvenue chez Ecole Confinee', 'Bienvenue chez nous ! Vous êtes un ' + account.type);
											});
										break;
									}
								});
						}
					}
				});
		}
	},

	updateAccount: function(req, res) {

	},

	deleteAccount: function(req, res) {

	}
};