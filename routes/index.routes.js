const express = require('express');
const { getHome } = require('../controllers/home.controller');
const loggerMiddleware = require('../middlewares/logger.middleware');

const router = express.Router();

// Se registra cada acceso a la ruta principal
router.get('/', loggerMiddleware, getHome);

module.exports = router;
