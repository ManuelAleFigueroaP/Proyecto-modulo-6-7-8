const fs = require('fs');
const path = require('path');

const LOG_FILE_PATH = path.join(__dirname, '..', 'logs', 'log.txt');

function buildLogLine(route) {
  const now = new Date();
  const date = now.toLocaleDateString('es-CL');
  const time = now.toLocaleTimeString('es-CL', { hour12: false });

  return `[${date} ${time}] Ruta accedida: ${route}\n`;
}

function appendRouteLog(route) {
  return new Promise((resolve, reject) => {
    const line = buildLogLine(route);

    fs.appendFile(LOG_FILE_PATH, line, 'utf8', (error) => {
      if (error) {
        return reject(error);
      }

      return resolve();
    });
  });
}

module.exports = {
  appendRouteLog
};
