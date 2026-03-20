const dotenv = require('dotenv');
const { sequelize } = require('../models');

dotenv.config();

async function run() {
  try {
    const alter = process.env.DB_SYNC_ALTER === 'true';
    const force = process.env.DB_SYNC_FORCE === 'true';

    await sequelize.sync({ alter, force });
    console.log(`Sync completado. alter=${alter} force=${force}`);
    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar modelos:', error.message);
    process.exit(1);
  }
}

run();
