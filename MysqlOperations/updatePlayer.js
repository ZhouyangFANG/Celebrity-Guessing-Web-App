// update a player
module.exports = async (db, player) => {
  try {
    const query = 'UPDATE game_test.players SET points=?, maxpoints=? WHERE name=?';
    const params = [player.points, player.maxpoints, player.name];
    const [row] = await db.execute(query, params);
    if (row.affectedRows === 0) {
      throw new Error('player not found');
    }
    // console.log(`updated ${JSON.stringify(row.affectedRows)} player(s)`);
  } catch (err) {
    // console.log(`error: ${err.message}`);
  }
};
