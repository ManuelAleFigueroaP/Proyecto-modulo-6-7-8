const AppError = require('../utils/appError');
const { User, Order } = require('../models');

async function listUsers(nombre) {
  const where = {};
  if (nombre) {
    where.nombre = nombre;
  }

  return User.findAll({
    where,
    order: [['id', 'ASC']]
  });
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  return user;
}

async function createUser(payload) {
  const created = await User.create(payload);
  return User.findByPk(created.id);
}

async function updateUser(id, payload) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  await user.update(payload);
  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  await user.destroy();

  return {
    message: `Usuario con id ${id} eliminado correctamente`
  };
}

async function getUserWithOrders(id) {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Order,
        as: 'pedidos',
        attributes: ['id', 'descripcion', 'total', 'createdAt']
      }
    ]
  });

  if (!user) {
    throw new AppError('Usuario no encontrado', 404);
  }

  return user;
}

async function getAllUsersWithOrders() {
  return User.findAll({
    include: [
      {
        model: Order,
        as: 'pedidos',
        attributes: ['id', 'descripcion', 'total', 'createdAt']
      }
    ],
    order: [
      ['id', 'ASC'],
      [{ model: Order, as: 'pedidos' }, 'id', 'ASC']
    ]
  });
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserWithOrders,
  getAllUsersWithOrders
};
