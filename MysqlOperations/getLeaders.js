// get certain number of leaders
module.exports = async (db, num) => {
  try {
    const query = 'SELECT * FROM cis557.players ORDER BY maxpoints DESC LIMIT ?';
    // console.log('7');
    const params = [num];
    // console.log('8');
    const [rows] = await db.execute(query, params);
    // console.log('9');
    return rows;
  } catch (err) {
    // console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};
