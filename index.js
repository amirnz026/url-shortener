const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const shortUrl = require('./routes/api/shorturl');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use('/api/shorturl', shortUrl);

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.redirect('https://www.google.com');
});

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
