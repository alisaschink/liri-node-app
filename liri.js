var keys = require('./keys.js');

var keysData = [];
var command = process.argv[2];

for (key in keys.twitterKeys){
  keysData.push(keys.twitterKeys[key]);
}

//switch statement or if/else for commands
if (command == "my-tweets"){
  // show last 20 tweets and when they were created
  var Twitter = require('twitter'); 
  var userName = 'alisa_schink';
 
  var client = new Twitter({
    consumer_key: keysData[0],
    consumer_secret: keysData[1],
    access_token_key: keysData[2],
    access_token_secret: keysData[3]
  });

  var params = {screen_name: userName};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });

} else if (command == "spotify-this-song"){
  var spotify = require('spotify');
  
  if (process.argv[3] != "undefined"){
      var song = process.argv[3];
    } else {
      var song = "the sign"
    }
 
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    
    // show artist(s)
    console.log("Artist: " +JSON.stringify(data.tracks.items[1].album.artists[0].name, null, 2));
    // song's name
    console.log("Song Name: " + JSON.stringify(data.tracks.items[1].name, null, 2));
    // preview link
    console.log("Preview: " + JSON.stringify(data.tracks.items[1].preview_url, null, 2));
    // album
    console.log("Album: " + JSON.stringify(data.tracks.items[1].album.name, null, 2));
    //default song the sign ace of base
});

} else if (command == "movie-this"){
  // title of movie
  // year it came out
  // country produced
  // language
  // plot
  // actors
  // rotten tomatoes rating
  // rotten tomatoes URL
  // default mr nobody
} else if (command == "do-what-it-says"){
  // use random.txt to take in command
} else {
  console.log("that is not a valid command");
}