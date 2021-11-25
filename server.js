// import addPlayer from './MysqlOperations/addPlayer';
// import connect from './MysqlOperations/connect';
// import deletePlayer from './MysqlOperations/deletePlayer';
// import getPlayer from './MysqlOperations/getPlayer';
// import getPlayers from './MysqlOperations/getPlayers';

// Create express app
const express = require('express');
const webapp = express();

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
  console.log('READ all players');
  try {
    const results = await require('./MysqlOperations/getPlayers.js')(db);
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/player/:id', async (req, res) => {
  console.log('READ a player by id');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing' });
      return;
    }
    const result = await require('./MysqlOperations/getPlayer.js')(db, req.params.id);
    if (result === undefined) {
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.post('/player/', async (req, res) => {
  console.log('CREATE a player');
  if (!req.body.player || !req.body.points) {
    res.status(404).json({ error: 'missing name or points' });
    return;
  }
  // create new player object
  const newPlayer = {
    player: req.body.player,
    points: req.body.points,
  };
  try {
    const result = await require('./MysqlOperations/addPlayer.js')(db, newPlayer);
    console.log(`id: ${JSON.stringify(result)}`);
    // add id to new player and return it
    res.status(201).json({
      student: { id: result, ...newPlayer },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.delete('/player/:player', async (req, res) => {
  if (req.params.player === undefined) {
    res.status(404).json({ error: 'name is missing' });
    return;
  }
  console.log('DELETE a player');
  try {
    const result = await require('./MysqlOperations/deletePlayer.js')(db, req.params.player);
    console.log(`result-->${result}`);
    if (Number(result) === 0) {
      res.status(404).json({ error: 'player not in the system' });
      return;
    }
    res.status(200).json({ message: `Deleted ${result} player(s) with name ${req.params.player}` });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, async () => {
  db = await require('./MysqlOperations/connect.js')();
  console.log(`Server running on port:${port}`);
});
