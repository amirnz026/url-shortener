
// const dns = require('node:dns');
// dns.lookup('www.ffsdkjgokfdasjgijisdfjkile.com', (err, address, family) => {
//   if (err) console.log(err.code);
//   console.log('right');
// });

const regex = /https*:\/\//;
const str = 'http://google.com'

if (str.split(regex).length == 1) {
  str = str.split(regex)
}

console.log(str.split(regex))