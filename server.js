// Create express app
const express = require('express');
const webapp = express();

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  })
);

// Root endpoint
// TODO: Will need to alter this for deployment
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to HW4 Backend' });
});

// TODO: define all endpoints as specified in REST API

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
