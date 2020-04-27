const express = require('express');
const router = express.Router();

const { DomainsController } = require('../controllers');

router.get('/', function(req, res) {
	DomainsController
		.getAllDomains()
		.then(function(domains) {
			res.json(domains);
		});
});

module.exports = router;