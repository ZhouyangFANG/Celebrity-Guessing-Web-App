// update a player
module.exports = async (db, player) => {
  try {
    const query = 'UPDATE cis557.players SET points=?, maxpoints=? WHERE name=?';
    const params = [player.points, player.maxpoints, player.name];
    // console.log(params);
    const [row] = await db.execute(query, params);
    // console.log(row.affectedRows);
    if (row.affectedRows === 0) {
      throw new Error('player not found');
    }
    // console.log(`updated ${JSON.stringify(row.affectedRows)} player(s)`);
  } catch (err) {
    throw new Error('player not found');
  }
};
