// import addPlayer from './MysqlOperations/addPlayer';
// import connect from './MysqlOperations/connect';
// import deletePlayer from './MysqlOperations/deletePlayer';
// import getPlayer from './MysqlOperations/getPlayer';
// import getPlayers from './MysqlOperations/getPlayers';

// Create express app
const express = require('express');
const cors = require('cors');
const getPlayers = require('./MysqlOperations/getPlayers');
const getPlayer = require('./MysqlOperations/getPlayer');
const addPlayer =  require('./MysqlOperations/addPlayer');
const deletePlayer = require('./MysqlOperations/deletePlayer');
const connect = require('./MysqlOperations/connect');

const webapp = express();

webapp.use(cors());
webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  })
);

// declare DB object

let db;

// Root endpoint
// TODO: Will need to alter this for deployment
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to HW4 Backend' });
});

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
    if (req.params.id === undefined) {
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
    maxpoints: req.body.maxpoints
  };
  try {
    const result = await addPlayer(db, newPlayer);
    // console.log(`id: ${JSON.stringify(result)}`);
    // add id to new player and return it
    res.status(201).json({
      student: { id: result, ...newPlayer },
    });
  } catch (err) {
    res.status(409).json({ error: 'the player already exists in the database' });
  }
});

webapp.delete('/player/:id', async (req, res) => {
  if (req.params.id === undefined) {
    res.status(404).json({ error: 'player not found' });
    return;
  }
  // console.log('DELETE a player');
  try {
    const result = await deletePlayer(db, req.params.id);
    // console.log(`result-->${result}`);
    if (Number(result) === 0) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    res.status(200).json({ message: 'player deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'player not found' });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, async () => {
  db = await connect();
  // console.log(`Server running on port:${port}`);
});
