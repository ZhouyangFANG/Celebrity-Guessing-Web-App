// update a player
module.exports = async (db, player) => {
  try {
    const query = 'UPDATE game_test.players SET points=? WHERE player=?';
    const params = [player.points, player.player];
    const [row] = await db.execute(query, params);
    // console.log(`updated ${JSON.stringify(row.affectedRows)} player(s)`);
  } catch (err) {
    // console.log(`error: ${err.message}`);
  }
};
