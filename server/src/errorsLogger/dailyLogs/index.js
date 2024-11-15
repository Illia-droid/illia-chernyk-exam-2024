const fs = require('fs').promises;
const path = require('path');

const dateStr = new Date().toISOString().split('T')[0];

const errorLogsPath = path.join(__dirname, '..', 'errorLogs.json');
const transformedLogsPath = path.join(__dirname, `${dateStr}.json`);

const backupLogs = async () => {
  let intervalId;
  try {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const data = await fs.readFile(errorLogsPath, 'utf8');
    const errorLogsData = data ? JSON.parse(data) : [];
    const transformedData = errorLogsData.map(({ message, code, time }) => ({
      message,
      code,
      time,
    }));

    await fs.writeFile(
      transformedLogsPath,
      JSON.stringify(transformedData, null, 2),
      'utf8'
    );
    console.log(`Logs was saved at ${transformedLogsPath}`);
    await fs.unlink(errorLogsPath);
    intervalId = setInterval(backupLogs, 1000 * 60 * 60 * 24);
  } catch (err) {
    console.error('Processing error:', err);
  }
};

backupLogs();
