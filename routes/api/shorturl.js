const express = require('express');
const router = express.Router();
const Url = require('../../models/Url');
const urlValidator = require('../../middleware/urlValidator');

router.get('/', async (req, res) => {
  console.log('kir');

  console.log('get');
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post('/', urlValidator, async (req, res) => {
  console.log(`sent url ${req.body.url}`);

  try {
    const foundUrl = await Url.findOne({ original_url: String(req.body.url) });
    if (foundUrl) {
      return res.json({
        original_url: foundUrl.original_url,
        short_url: foundUrl.short_url,
      });
    }
  } catch (err) {
    res.send(err);
  }

  const url = new Url({
    original_url: req.body.url,
    short_url: Math.floor(Math.random() * 10000),
  });

  try {
    const savedUrl = await url.save();
    res.json({
      original_url: savedUrl.original_url,
      short_url: savedUrl.short_url,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
router.get('/deletedb', (req, res) => {
  Url.deleteMany({}, function (err) {
    res.json({ msg: 'The DB emptied' });
  });
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const url = await Url.findOne({ short_url: Number(req.params.shortUrl) });
    if (url) {
      return res.redirect(url.original_url);
    } else {
      res.json('error');
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
