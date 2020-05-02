const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const { DomainsController } = require('../controllers');

router.get('/', function(req, res) {
	var promise;

	if (req.query.search != undefined) {
		promise = DomainsController.getDomainsByName(req.query.search);
	} else {
		promise = DomainsController.getAllDomains();
	}

	promise.then(function(response) {
		res.status(response.status).json(response);
	});
});

router.get('/:domainId', function(req, res) {
	DomainsController
		.getDomainById(req.params.domainId)
		.then(function(response) {
			res.status(response.status).json(response);
		});
});

router.post('/', function(req, res) {
	if (req.body.name == undefined) {
		res.status(400).json({
			status: 400,
			success: false,
			body: 'Name parameter not given'
		});
		return;
	}

	DomainsController
		.createDomain(req.body.name)
		.then(function(response) {
			res.status(response.status).json(response);
		});	
});

module.exports = router;