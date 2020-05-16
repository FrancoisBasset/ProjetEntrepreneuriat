const express = require('express');
const bodyParser = require('body-parser');
const {  SectionsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', SectionsController.get);
router.get('/:id', SectionsController.getId);
router.post('/', SectionsController.post);

module.exports = router;