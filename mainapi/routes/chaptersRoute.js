const express = require('express');
const bodyParser = require('body-parser');
const { ChaptersController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', ChaptersController.get);
router.get('/:id', ChaptersController.getId);
router.post('/', ChaptersController.post);
router.put('/:id', ChaptersController.put);
router.delete('/:id', ChaptersController.delete);

module.exports = router;