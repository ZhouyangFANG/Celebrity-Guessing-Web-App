const mysql = require('mysql2/promise');

// Connect to our db on the cloud
module.exports = async (dbInfo) => {
  try {
    const connection = await mysql.createConnection({
      host: dbInfo.host,
      user: dbInfo.user,
      password: dbInfo.password,
      database: dbInfo.database,
    });
      // Connected to db
    // console.log(`Connected to database: ${connection.connection.config.database}`);
    return connection;
  } catch (err) {
    // console.error(err.message);
    throw new Error('Error connecting to database');
  }
};
