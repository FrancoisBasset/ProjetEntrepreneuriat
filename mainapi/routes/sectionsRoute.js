const express = require('express');
const bodyParser = require('body-parser');
const { SectionsController, CoursesController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

const multer = require('multer');
const upload = multer({
	dest: './assets/images'
});

const mConnect = require('./middlewares/mConnect');

router.get('/:type/', SectionsController.get);
router.get('/:type/:id', SectionsController.getId);

router.post('/:type', upload.single('image'), mConnect, SectionsController.postPut);
router.put('/:type', upload.single('image'), mConnect, SectionsController.postPut);

router.post('/courses/:id/favorite', mConnect, CoursesController.addFavorite);
router.delete('/courses/:id/favorite', mConnect, CoursesController.deleteFavorite);

router.post('/courses/:id/start', mConnect, CoursesController.start);
router.post('/courses/:id/start/:chapterId', mConnect, CoursesController.start);



module.exports = router;