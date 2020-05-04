const express = require('express');
const bodyParser = require('body-parser');
const { BranchesController } = require('../controllers');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', BranchesController.get);
router.get('/:id', BranchesController.getId);
router.post('/', BranchesController.post);
router.put('/:id', BranchesController.put);
router.delete('/:id', BranchesController.delete);

module.exports = router;