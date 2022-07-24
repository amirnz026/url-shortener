const dns = require('node:dns');
const express = require('express');
const router = express.Router();

const urlValidator = (req, res, next) => {
  let url = req.body.url;
  const regexHttps = /https*:\/\//;
  const urlSplittedArray = url.split(regexHttps);
  if (urlSplittedArray.length == 1) {
    url = urlSplittedArray[0];
  } else {
    url = urlSplittedArray[1];
  }
  console.log(url);
  dns.lookup(url, (err, address, family) => {
    console.log(address);
    if (address == undefined) return res.json({ error: 'invalid url' });
    next();
  });
};
module.exports = urlValidator;
