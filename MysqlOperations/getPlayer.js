const mysql = require('mysql2/promise');

// get player by id
const getPlayer = async (db, id) => {
  try {
    const query = 'select * from game_test.players where id = ?';
    const params = [id];
    const row = await db.execute(query, params);
    return row[0][0];
  } catch (err) {
    throw new Error('Error executing the query');
  }
};

export default getPlayer;