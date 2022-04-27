const express = require('express');
const app = express();
const router = require('./routes/router');
const port = process.env.PORT || process.env.SYSTEM_PORT || 3000;

require('./database');

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('Server running at port: ' + port);
});

module.exports = app;
