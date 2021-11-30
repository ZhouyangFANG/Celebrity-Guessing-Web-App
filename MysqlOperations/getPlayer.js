// get player by id
module.exports = async (db, id) => {
  try {
    const query = 'select * from cis557.players where id = ?';
    const params = [id];
    const row = await db.execute(query, params);
    // console.log(row);
    return row[0][0];
  } catch (err) {
    throw new Error('Error executing the query');
  }
};
