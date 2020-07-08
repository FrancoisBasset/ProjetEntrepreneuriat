const express = require('express');
const bodyParser = require('body-parser');
const { AccountsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

const mConnect = require('./middlewares/mConnect');

router.get('/', mConnect, AccountsController.get);

router.get('/all', mConnect, AccountsController.getAll);

router.post('/signin', AccountsController.connect);
router.post('/', AccountsController.createAccount);
router.post('/logout', mConnect, AccountsController.disconnect);

router.put('/password', mConnect, AccountsController.updatePassword);
router.put('/', mConnect, AccountsController.updateAccount);
router.delete('/', mConnect, AccountsController.deleteAccount);

module.exports = router;