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

// const dbLib = require('./dbOperationsMySQL');
// const profiles = require('./profiles');
let db;
const request = require('supertest');
const webapp = require('../server');
const connect = require('../MysqlOperations/connect');

// cleanup the database after each test
const clearDatabase = async () => {
  await knex('players').where('name', 'testName').del();
};

/**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add - "jest": true -
 */
beforeAll(async () => {
  db = await connect(dbInfo);
  await clearDatabase();
});

// afterEach(async () => {
//   await clearDatabase();
// });

afterAll(async () => {
  await clearDatabase();
});

describe('Create player endpoint API & integration tests', () => {

  // test('test isInt function', () => {
  //   expect(isInt())
  // })

  test('status code and response missing points', () =>
    request(webapp).post('/player/').send('player=testuser')
      .expect(400) // testing the response status code
      .then((response) => {
        expect(JSON.parse(response.text).error).toBe('invalid input, object invalid');
      }));

  test('The new player is in the database', () =>
    request(webapp).post('/player').send(testPlayer)
      .expect(201)
      .then(async () => {
        const newPlayer = await knex.select('name').from('players').where('name', '=', 'testName');
        expect(newPlayer[0].name).toBe('testName');
      }));

  test('test get all players', () =>
    request(webapp).get('/players')
      .expect(200)
      .then((response) => {
        expect(response.body[0]).toHaveProperty('name');
      }));

  test('test get non-exist player ', () =>
    request(webapp).get('/player/2318237485934321474')
      .expect(404)
  );
  test('test get bad url player', () =>
    request(webapp).get('/player/hhsaufh')
      .expect(404)
  );

  test('delete player', () =>
    request(webapp).delete('/player/748573184573147564365').send('player=testuser')
      .expect(404) // testing the response status code
      .then((response) => {
        expect(JSON.parse(response.text).error).toBe('player not found');
      }));

  test('successfully update player', async () => {
    const p = await knex.select('id').from('players').where('name', '=', 'testName');
    request(webapp).put(`/player/${p[0].id}`).send(testUpdatedPlayer)
      .expect(200);
    // request(webapp).put(`/player/${p[0].id}`).send(testUpdatedPlayer)
    // .expect(200);
  }
  );

  test('update player failed', () =>
    request(webapp).put('/player/sfjaifajfi')
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toBe('player not found');
      }));

  test('update non-exist player failed', () =>
    request(webapp).put('/player/34783478145')
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toBe('player not found');
      }));

  test('get leaders failed', () =>
    request(webapp).get('/leaders/saf')
      .expect(400)
      .then((response) => {
        expect(JSON.parse(response.text).error).toBe('bad url');
      }));

  test('get leaders success', () =>
    request(webapp).get('/leaders/1')
      .expect(200));

  // test('access other url', () =>
  //   request(webapp).post('/safhuiafafaf')
  //     .expect(404));
});
