const express = require('express');
const bodyParser = require('body-parser');
const { DomainsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', DomainsController.get);
router.get('/:id', DomainsController.getId);
router.post('/', DomainsController.post);
router.put('/:id', DomainsController.put);
router.delete('/:id', DomainsController.delete);

module.exports = router;