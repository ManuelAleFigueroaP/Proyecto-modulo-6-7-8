function getStatus(req, res) {
  return res.status(200).json({
    ok: true,
    service: 'modulo-6-backend-base',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getStatus
};
