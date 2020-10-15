const express = require('express');
const routes = require('./src/routes.js');

const app = express();
app.use(express.json());

app.use('/apitime', routes);

app.listen(3001);