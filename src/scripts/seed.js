const dotenv = require('dotenv');
const { User, Order, sequelize } = require('../models');

dotenv.config();

async function runSeed() {
  const transaction = await sequelize.transaction();

  try {
    const existingUsers = await User.count({ transaction });

    if (existingUsers > 0) {
      console.log('Seed omitido: ya existen usuarios en la base.');
      await transaction.rollback();
      process.exit(0);
    }

    const users = await User.bulkCreate(
      [
        { nombre: 'Juan Perez', email: 'juan@example.com', password: '123456' },
        { nombre: 'Maria Lopez', email: 'maria@example.com', password: '123456' },
        { nombre: 'Carlos Ruiz', email: 'carlos@example.com', password: '123456' }
      ],
      { transaction }
    );

    await Order.bulkCreate(
      [
        { descripcion: 'Pedido inicial Juan', total: 15000, userId: users[0].id },
        { descripcion: 'Pedido inicial Maria', total: 22000, userId: users[1].id },
        { descripcion: 'Pedido inicial Carlos', total: 18000, userId: users[2].id }
      ],
      { transaction }
    );

    await transaction.commit();
    console.log('Seed ejecutado correctamente: 3 usuarios y 3 pedidos creados.');
    process.exit(0);
  } catch (error) {
    await transaction.rollback();
    console.error('Error en seed. Rollback aplicado:', error.message);
    process.exit(1);
  }
}

runSeed();
