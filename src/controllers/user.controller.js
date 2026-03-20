const userService = require('../services/user.service');
const transactionService = require('../services/transaction.service');
const AppError = require('../utils/appError');
const { validateCreateUser, validateUpdateUser } = require('../utils/validators');

async function getUsers(req, res, next) {
  try {
    const { nombre } = req.query;
    const users = await userService.listUsers(nombre);
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const validationError = validateCreateUser(req.body);
    if (validationError) {
      throw new AppError(validationError, 400);
    }

    const user = await userService.createUser(req.body);
    res.status(201).json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { error, validData } = validateUpdateUser(req.body);
    if (error) {
      throw new AppError(error, 400);
    }

    const updatedUser = await userService.updateUser(req.params.id, validData);
    res.status(200).json({ ok: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json({ ok: true, ...result });
  } catch (error) {
    next(error);
  }
}

async function getUserOrders(req, res, next) {
  try {
    const user = await userService.getUserWithOrders(req.params.id);
    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
}

async function getUsersWithOrders(req, res, next) {
  try {
    const users = await userService.getAllUsersWithOrders();
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    next(error);
  }
}

async function createUserWithInitialOrder(req, res, next) {
  try {
    const validationError = validateCreateUser(req.body);
    if (validationError) {
      throw new AppError(validationError, 400);
    }

    const result = await transactionService.createUserWithInitialOrder(req.body);
    res.status(201).json({
      ok: true,
      message: 'Usuario y pedido inicial creados en una transaccion',
      data: result
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  getUsersWithOrders,
  createUserWithInitialOrder
};
