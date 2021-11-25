const mysql = require('mysql2/promise');

// Connect to our db on the cloud
module.exports = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'database-1.cnqpke8cpazr.us-east-2.rds.amazonaws.com',
      user: 'admin',
      password: 'cergaf-rizqak-dokfY9',
      database: 'database-1',
    });
      // Connected to db
    console.log(`Connected to database: ${connection.connection.config.database}`);
    return connection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};