const express = require('express');
const bodyParser = require('body-parser');
const { CertificationsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', CertificationsController.get);
//router.get('/:id', SectionsController.getId);

router.post('/', CertificationsController.post);

router.put('/:id', CertificationsController.validate);

module.exports = router;