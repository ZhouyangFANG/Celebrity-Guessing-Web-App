const mysql = require('mysql2/promise');

// delete player by name
module.exports = async (db, name) => {
  try {
    const query = 'DELETE FROM game_test.players WHERE player=?';
    const [row] = await db.execute(query, [name]);
    return row.affectedRows; // number of records deleted
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};