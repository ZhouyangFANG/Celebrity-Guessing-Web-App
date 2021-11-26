// get all players
module.exports = async (db) => {
  try {
    const query = 'SELECT * FROM cis557.players';
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    // console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};
