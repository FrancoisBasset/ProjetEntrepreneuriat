const express = require('express');
const bodyParser = require('body-parser');
const {  SectionsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

const multer = require('multer');
const upload = multer({
	dest: './assets/images'
});

router.get('/', SectionsController.get);
router.get('/:id', SectionsController.getId);
router.post('/', upload.single('image'), SectionsController.post);

module.exports = router;