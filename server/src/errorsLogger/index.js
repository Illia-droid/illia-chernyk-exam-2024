const fs = require('fs').promises;
const path = require('path');

const logFilePath = path.join(__dirname, 'errorLogs.json');

const logError = async (message, code, stackTrace) => {
  const errorLog = {
    message: message || 'Unknown error',
    time: new Date().toISOString().split('T')[1].split('.')[0],
    code: code || 500,
    stackTrace: stackTrace || {},
  };
  try {
    const data = await fs.readFile(logFilePath, 'utf8').catch((err) => {
      if (err.code === 'ENOENT') {
        return '[]';
      }
      throw err;
    });
    
    const logs = JSON.parse(data);
    logs.push(errorLog);

    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error('Failed to log error:', err);
  }
};

module.exports = logError;