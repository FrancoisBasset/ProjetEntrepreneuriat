const express = require('express');
const bodyParser = require('body-parser');
const { ClassesController } = require('../controllers');
const mConnect = require('./middlewares/mConnect');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', ClassesController.getAll);
router.get('/:id', ClassesController.getById);
router.post('/', mConnect, ClassesController.post);
router.put('/:id', mConnect, ClassesController.put);
router.put('/:id/plan', mConnect, ClassesController.plan);
router.put('/:id/pay', mConnect, ClassesController.pay);
router.put('/:id/register', mConnect, ClassesController.register);
router.put('/:id/unregister', mConnect, ClassesController.unregister);

module.exports = router;