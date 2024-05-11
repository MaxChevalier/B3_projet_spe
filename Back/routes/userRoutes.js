const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:id', validateRequest, userController.updateUser);
router.delete('/:id',validateRequest, userController.deleteUser);

module.exports = router;
