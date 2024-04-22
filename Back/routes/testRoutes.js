const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', testController.getAllTests);
router.get('/:id', testController.getTestById);
router.post('/', validateRequest, testController.addTest);
router.put('/:id', validateRequest, testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;
