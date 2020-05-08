const express = require('express');
const bodyParser = require('body-parser');
const { AccountsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', AccountsController.connect);
router.post('/', AccountsController.createAccount);
/*router.put('/:id', AccountsController.modifyAccount);
router.delete('/:id', AccountsController.deleteAccount);*/

module.exports = router;