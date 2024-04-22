const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', levelController.getAllLevels);
router.get('/:id', levelController.getLevelById);
router.post('/', validateRequest, levelController.addLevel);
router.put('/:id', validateRequest, levelController.updateLevel);
router.delete('/:id', levelController.deleteLevel);

module.exports = router;
