const mysql = require('mysql2/promise');

// Connect to our db on the cloud
module.exports = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'database-1.cnqpke8cpazr.us-east-2.rds.amazonaws.com',
      user: 'admin',
      password: 'cergaf-rizqak-dokfY9',
      database: 'cis557',
      // host: process.env.HOST,
      // user: process.env.USER,
      // password: process.env.PASSWORD,
      // database: process.env.DATABASE
    });
      // Connected to db
    // console.log(`Connected to database: ${connection.connection.config.database}`);
    return connection;
  } catch (err) {
    // console.error(err.message);
    throw new Error('Database info required');
  }
};
