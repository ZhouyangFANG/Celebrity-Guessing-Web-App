// delete player by name
module.exports = async (db, id) => {
  try {
    const query = 'DELETE FROM cis557.players WHERE id=?';
    await db.execute(query, [id]);
    // const [row] = await db.execute(query, [id]);
    // return row.affectedRows; // number of records deleted
  } catch (err) {
    // console.log(`error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};
