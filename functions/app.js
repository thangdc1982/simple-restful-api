const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const appRouter = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/', appRouter);

// Connect DB
mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true  
}, () => {
  console.log('DB Connected');
});

// Listening
app.listen(4000, () => {
  console.log('Listening on port 4000');
});