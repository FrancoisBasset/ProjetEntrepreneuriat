const express = require('express');
const router = express.Router();

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

module.exports = router;