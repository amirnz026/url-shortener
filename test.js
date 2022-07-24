const dns = require('node:dns');
const newRegex = /\.\w*\//;
const url =
  'https://www.freecodecamp.org/faaf';
dns.lookup(url, (err, address, family) => {
  console.log(url.split(newRegex))
  console.log('address: %j family: IPv%s', address, family);
});
