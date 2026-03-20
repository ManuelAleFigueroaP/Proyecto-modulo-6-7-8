const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const indexRoutes = require('./routes/index.routes');
const statusRoutes = require('./routes/status.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve recursos estaticos desde /public en la URL /public
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/status', statusRoutes);

// Manejador basico para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Ruta no encontrada'
  });
});

// Manejador basico de errores
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    ok: false,
    message: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
