const mysql = require('mysql2/promise');

// get all players
module.exports = async (db) => {
  try {
    const query = 'SELECT * FROM game_test.players';
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};