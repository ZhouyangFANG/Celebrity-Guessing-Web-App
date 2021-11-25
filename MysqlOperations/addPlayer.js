const mysql = require('mysql2/promise');

// get player by id
module.exports = async (db, newPlayer) => {
  const query = 'INSERT  INTO game_test.players (player , points) VALUES(?, ?)';
  const params = [newPlayer.player, newPlayer.points];
  try {
    const row = await db.execute(query, params);
    return row[0].insertId; // return id of new record
  } catch (err) {
    throw new Error('Error executing the query');
  }
};