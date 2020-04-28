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

module.exports = router;