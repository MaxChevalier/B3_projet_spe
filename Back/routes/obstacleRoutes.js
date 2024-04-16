const express = require('express');
const router = express.Router();
const obstacleController = require('../controllers/obstacleController');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', obstacleController.getAllObstacles);
router.get('/:id', obstacleController.getObstacleById);
router.post('/', validateRequest, obstacleController.addObstacle);
router.put('/:id', validateRequest, obstacleController.updateObstacle);
router.delete('/:id', validateRequest,obstacleController.deleteObstacle);

module.exports = router;
