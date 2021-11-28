// http://knexjs.org/#Installation-client for MySQL connection
const knex = require('knex')({
  client: 'mysql',
  connection: {
    port: 3306,
    host: 'database-1.cnqpke8cpazr.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'cergaf-rizqak-dokfY9',
    database: 'cis557',
  }
});

// set database information
const dbInfo = {
  host: 'database-1.cnqpke8cpazr.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'cergaf-rizqak-dokfY9',
  database: 'cis557',
};

// const dbLib = require('./dbOperationsMySQL');
// const profiles = require('./profiles');
let db;
const addPlayer = require('../MysqlOperations/addPlayer');
const connect = require('../MysqlOperations/connect');
const deletePlayer = require('../MysqlOperations/deletePlayer');
const getLeaders = require('../MysqlOperations/getLeaders');
const getPlayer = require('../MysqlOperations/getPlayer');
const getPlayers = require('../MysqlOperations/getPlayers');
const updatePlayer = require('../MysqlOperations/updatePlayer');

// cleanup the database after each test
const clearDatabase = async () => {
  await knex('players').where('name', 'testName').del();
};

/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add - "jest": true -
 */
beforeEach(async () => {
  db = await connect(dbInfo);
  await clearDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

// afterAll(async () => {
//   await clearDatabase();
// });

describe('Update Player', () => {
  // test data
  const testPlayer = {
    name: 'testName',
    points: 3,
    maxpoints: 5,
  };
  const testUpdatedPlayer = {
    name: 'testName',
    points: 7,
    maxpoints: 9,
  };
  test('update a player', async () => {
    db = await connect(dbInfo);
    const testId = await addPlayer(db, testPlayer);
    await updatePlayer(db, testUpdatedPlayer);

  });
  // test('addPlayer exception', async () => {
  //   db = await dbLib.connect(profiles.profile2);
  //   try {
  //     await dbLib.addPlayer(db, testPlayer)
  //   } catch (err) {
  //     expect(err.message).toBe('Error executing the query');
  //   }
  // });
});