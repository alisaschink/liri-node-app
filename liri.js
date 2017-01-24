var keys = require('./keys.js');

var keysData = [];

for (key in keys.twitterKeys){
  keysData.push(keys.twitterKeys[key]);
}

console.log(keysData);
