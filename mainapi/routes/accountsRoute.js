const express = require('express');
const bodyParser = require('body-parser');
const { AccountsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

const mConnect = require('./middlewares/mConnect');

router.get('/', mConnect, AccountsController.get);

router.post('/signin', AccountsController.connect);
router.post('/', AccountsController.createAccount);
router.post('/logout', mConnect, AccountsController.disconnect);

//router.put('/:id', AccountsController.modifyAccount);
//router.delete('/:id', AccountsController.deleteAccount);

module.exports = router;