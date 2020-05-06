const express = require('express');
const bodyParser = require('body-parser');
const { CoursesController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', CoursesController.get);
router.get('/:id', CoursesController.getId);
router.post('/', CoursesController.post);
router.put('/:id', CoursesController.put);
router.delete('/:id', CoursesController.delete);

module.exports = router;