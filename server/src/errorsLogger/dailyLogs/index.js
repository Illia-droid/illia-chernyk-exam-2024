const fs = require('fs').promises;
const path = require('path');
const cron = require('node-cron');

const dateStr = () => new Date().toISOString().split('T')[0];

const errorLogsPath = path.join(__dirname, '..', 'errorLogs.json');
const transformedLogsPath = path.join(__dirname, `${dateStr()}.json`);

const backupLogs = async () => {
  try {
    const data = await fs.readFile(errorLogsPath, 'utf8').catch((err) => {
      if (err.code === 'ENOENT') {
        console.log('No errors to back up today.');
        return null;
      }
      throw err;
    });

    if (data) {
      const errorLogsData = JSON.parse(data);
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
      console.log(`Logs were saved at ${transformedLogsPath}`);

      await fs.writeFile(errorLogsPath, '[]', 'utf8');
      console.log('Error logs file has been cleared.');
    }
  } catch (err) {
    console.error('Processing error:', err);
  }
};

cron.schedule('0 0 * * *', () => backupLogs());

console.log('Cron job scheduled to backup daily logs every midnight.');

