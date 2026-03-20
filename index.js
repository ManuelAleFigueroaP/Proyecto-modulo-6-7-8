const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor activo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});

startServer();
