const { sequelize, User, Order } = require('../models');

async function createUserWithInitialOrder(payload) {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.create(
      {
        nombre: payload.nombre,
        email: payload.email,
        password: payload.password
      },
      { transaction }
    );

    if (payload.forceError === true) {
      throw new Error('Error forzado para probar rollback');
    }

    const order = await Order.create(
      {
        descripcion: payload.descripcionPedido || 'Pedido inicial de bienvenida',
        total: payload.totalPedido || 0,
        userId: user.id
      },
      { transaction }
    );

    const safeUser = await User.findByPk(user.id, { transaction });

    await transaction.commit();
    console.log(`Transaccion exitosa. Usuario ${user.id} y pedido ${order.id} creados.`);

    return { user: safeUser, order };
  } catch (error) {
    await transaction.rollback();
    console.error('Transaccion revertida (rollback):', error.message);
    throw error;
  }
}

module.exports = {
  createUserWithInitialOrder
};
