// import addPlayer from './MysqlOperations/addPlayer';
// import connect from './MysqlOperations/connect';
// import deletePlayer from './MysqlOperations/deletePlayer';
// import getPlayer from './MysqlOperations/getPlayer';
// import getPlayers from './MysqlOperations/getPlayers';

// Create express app
const express = require('express');
const cors = require('cors');
const path = require('path');
const getPlayers = require('./MysqlOperations/getPlayers');
const getPlayer = require('./MysqlOperations/getPlayer');
const addPlayer = require('./MysqlOperations/addPlayer');
const deletePlayer = require('./MysqlOperations/deletePlayer');
const connect = require('./MysqlOperations/connect');
const updatePlayer = require('./MysqlOperations/updatePlayer');
const getLeaders = require('./MysqlOperations/getLeaders');
const dbInfo = require('./db-config');

const webapp = express();

webapp.use(cors());
webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(express.static(path.join(__dirname, './client/build')));

// function isInt(value) {
//   return !Number.isNaN(value)
//          && parseInt(Number(value)) == value
//          && !Number.isNaN(parseInt(value, 10));
// }
function isInt(value) {
  const er = /^-?[0-9]+$/;
  return er.test(value);
}

// declare DB object

let db;

// TODO: define all endpoints as specified in REST API
// Other API endpoints
webapp.get('/players', async (_req, res) => {
  // console.log('READ all players');
  try {
    const results = await getPlayers(db);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: 'bad url' });
  }
});

webapp.get('/player/:id', async (req, res) => {
  // console.log('READ a player by id');
  try {
    if (!isInt(req.params.id)) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    const result = await getPlayer(db, req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'player not found' });
  }
});

webapp.post('/player', async (req, res) => {
  // console.log('CREATE a player');
  if (!req.body.name || !req.body.points || !req.body.maxpoints) {
    res.status(400).json({ error: 'invalid input, object invalid' });
    return;
  }
  // create new player object
  const newPlayer = {
    name: req.body.name,
    points: req.body.points,
    maxpoints: req.body.maxpoints,
  };
  try {
    const result = await addPlayer(db, newPlayer);
    // console.log(`id: ${JSON.stringify(result)}`);
    // add id to new player and return it
    res.status(201).json({ id: result, ...newPlayer });
  } catch (err) {
    res.status(409).json({ error: 'the player already exists in the database' });
  }
});

webapp.delete('/player/:id', async (req, res) => {
  if (!isInt(req.params.id)) {
    res.status(404).json({ error: 'player not found' });
    return;
  }
  // console.log('DELETE a player');
  try {
    const result = await getPlayer(db, req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    await deletePlayer(db, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'player not found' });
  }
});

webapp.put('/player/:id', async (req, res) => {
  if (!isInt(req.params.id)) {
    res.status(404).json({ error: 'player not found' });
    return;
  }
  const player = {
    // id: req.params.id,
    name: req.body.name,
    points: req.body.points,
    maxpoints: req.body.maxpoints,
  };
  // console.log(player);
  try {
    await updatePlayer(db, player);
    // const up = await getPlayer(db, 43);
    // console.log(up);
    res.status(200).json({ id: req.params.id, ...player });
  } catch (err) {
    res.status(404).json({ error: 'player not found' });
  }
});

webapp.get('/leaders/:num', async (req, res) => {
  if (!isInt(req.params.num)) {
    res.status(400).json({ error: 'bad url' });
    // res.status(400).json({ error: `${typeof req.params.num}` });
    return;
  }
  // console.log('2');
  try {
    const results = await getLeaders(db, req.params.num);
    // console.log('3');
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: 'bad url' });
  }
});

// Root endpoint
// TODO: Will need to alter this for deployment
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, async () => {
  db = await connect(dbInfo);
  // console.log(`Server running on port:${port}`);
});

module.exports = webapp;
