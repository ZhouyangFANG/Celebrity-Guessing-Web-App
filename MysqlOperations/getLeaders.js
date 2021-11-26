// get certain number of leaders
module.exports = async (db, num) => {
  try {
    const query = 'SELECT * FROM cis557.players ORDER BY maxpoints DESC LIMIT ?';
    const params = [num];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    // console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};
