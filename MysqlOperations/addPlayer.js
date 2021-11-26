// get player by id
module.exports = async (db, newPlayer) => {
  const query = 'INSERT  INTO cis557.players (name , points, maxpoints) VALUES(?, ?, ?)';
  const params = [newPlayer.name, newPlayer.points, newPlayer.maxpoints];
  try {
    const row = await db.execute(query, params);
    return row[0].insertId; // return id of new record
  } catch (err) {
    throw new Error('Error executing the query');
  }
};
