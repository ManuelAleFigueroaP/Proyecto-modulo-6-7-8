const { appendRouteLog } = require('../services/log.service');

function loggerMiddleware(req, res, next) {
  appendRouteLog(req.originalUrl || req.url)
    .then(() => next())
    .catch((error) => next(error));
}

module.exports = loggerMiddleware;
