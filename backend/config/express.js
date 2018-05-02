const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
// rotas
const rotas = require('../src/routes');
app.use('/api/v1', rotas);

module.exports = app;