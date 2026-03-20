const { ValidationError, UniqueConstraintError } = require('sequelize');
const AppError = require('../utils/appError');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      message: err.message
    });
  }

  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      ok: false,
      message: 'El valor de un campo unico ya existe (ej: email duplicado)'
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      message: err.errors.map((e) => e.message).join(', ')
    });
  }

  console.error('Error no controlado:', err);

  return res.status(500).json({
    ok: false,
    message: 'Error interno del servidor'
  });
}

module.exports = errorHandler;
