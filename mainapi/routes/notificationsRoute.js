const express = require('express');
const bodyParser = require('body-parser');
const { NotificationsController } = require('../controllers');
const mConnect = require('./middlewares/mConnect');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', NotificationsController.get);
router.post('/', mConnect, NotificationsController.post);
router.put('/:id', mConnect, NotificationsController.put);
router.put('/:id/send', mConnect, NotificationsController.send);

module.exports = router;