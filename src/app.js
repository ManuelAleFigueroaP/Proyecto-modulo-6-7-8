const express = require('express');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/status', (req, res) => {
  res.status(200).json({
    ok: true,
    modulo: '7',
    message: 'API de acceso a datos activa',
    timestamp: new Date().toISOString()
  });
});

app.use('/usuarios', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
