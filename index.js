require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const app = express();
const shortUrl = require('./routes/api/shorturl');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/api/shorturl', shortUrl);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  // res.json({ greeting: 'hello API' });

  res.redirect('https://www.google.com');
});

mongoose.connect(process.env.PORT || 3000, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
