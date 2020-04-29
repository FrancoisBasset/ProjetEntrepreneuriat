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
				res.json(domains);
			});
	} else {
		DomainsController
			.getAllDomains()
			.then(function(domains) {
				res.json(domains);
			});
	}
});

router.get('/:domainId', function(req, res) {
	DomainsController
		.getDomainById(req.params.domainId)
		.then(function(domain) {
			if (domain == null) {
				res.status(404).end();
				return;
			}
			
			res.json(domain);
		});
});

router.post('/', function(req, res) {
	if (req.body.name == undefined) {
		res.status(400).end();
	}	

	DomainsController
		.createDomain(req.body.name)
		.then(function(domain) {
			res.status(201).json(domain);
		});
});

module.exports = router;