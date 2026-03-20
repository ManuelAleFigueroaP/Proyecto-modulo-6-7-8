const path = require('path');

function getHome(req, res, next) {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    return res.status(200).sendFile(filePath);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getHome
};
