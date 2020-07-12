const express = require('express');
const bodyParser = require('body-parser');
const { ChatsController } = require('../controllers');
const mConnect = require('./middlewares/mConnect');

const router = express.Router();
router.use(bodyParser.json());

router.get('/:id', mConnect, ChatsController.getAll);
router.post('/', mConnect, ChatsController.post);

module.exports = router;