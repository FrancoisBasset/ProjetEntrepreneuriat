const express = require('express');
const bodyParser = require('body-parser');
const { AccountsController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', AccountsController.middlewareConnect , AccountsController.connect);
router.get('/:id', AccountsController.getId);
router.post('/', AccountsController.middlewareCreateAccount, AccountsController.createAccount);
router.post('/:id/favorite/:courseId', AccountsController.middlewareFavorite, AccountsController.favorite);
router.post('/:id/start/:courseId', AccountsController.start);
router.post('/:id/start/:courseId/:chapterId', AccountsController.start);

/*router.put('/:id', AccountsController.modifyAccount);
router.delete('/:id', AccountsController.deleteAccount);*/

module.exports = router;