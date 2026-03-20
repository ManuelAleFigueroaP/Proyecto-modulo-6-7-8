const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/con-pedidos', userController.getUsersWithOrders);
router.get('/:id', userController.getUserById);
router.get('/:id/pedidos', userController.getUserOrders);
router.post('/', userController.createUser);
router.post('/registro-con-pedido', userController.createUserWithInitialOrder);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
