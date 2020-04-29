const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const { DomainsController } = require('../controllers');

router.get('/', function(req, res) {
	if (req.query.search != undefined) {
		DomainsController
			.getDomainsByName(req.query.search)
			.then(function(domains) {
				res.json({
					success: true,
					response: domains
				});
			});
	} else {
		DomainsController
			.getAllDomains()
			.then(function(domains) {
				res.json({
					success: true,
					response: domains
				});
			});
	}
});

router.get('/:domainId', function(req, res) {
	DomainsController
		.getDomainById(req.params.domainId)
		.then(function(domain) {
			if (domain == null) {
				res.status(404).json({
					success: false,
					message: 'Domain not found'
				});
			} else {
				res.json({
					success: true,
					response: domain
				});
			}
		});
});

router.post('/', function(req, res) {
	if (req.body.name == undefined) {
		res.status(400).json({
			success: false,
			message: 'Name parameter not given'
		});
		return;
	}

	DomainsController
		.getDomainByName(req.body.name)
		.then(function(domain) {
			if (domain != null) {
				res.status(400).json({
					success: false,
					message: 'Domain name already exists'
				});
			} else {
				DomainsController
					.createDomain(req.body.name)
					.then(function(domain) {
						res.status(201).json({
							success: true,
							response: domain
						});
					});
			}
		});	
});

module.exports = router;