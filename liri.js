var keys = require('./keys.js');

var keysData = [];
var command = process.argv[2];
var input = process.argv[3];

//push twitter keys to array
for (key in keys.twitterKeys){
  keysData.push(keys.twitterKeys[key]);
}

function getTweets(){
  // show last 20 tweets and when they were created
  var Twitter = require('twitter'); 
  var userName = 'alisa_schink';
 
  var client = new Twitter({
    consumer_key: keysData[0],
    consumer_secret: keysData[1],
    access_token_key: keysData[2],
    access_token_secret: keysData[3]
  });

  var params = {screen_name: userName, count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      console.log(error);
    } else {
      //log tweets and when they were created
      for (i=0; i<tweets.length; i++){
      console.log(tweets[i].text + " " + tweets[i].created_at);
      }
    }
  });

}

function getSong() {
  var spotify = require('spotify');
  //if song name isnt specified...
  if (!input){
      var song = "the sign ace of base"
    } else {
      var song = input;
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
    // default song the sign ace of base
  });
}

function getMovie() {
  var movieName = "";
  // grabs movie name and stores it as a variable
  // if movie name isnt specified...
  if (!input){
     // default mr nobody
    movieName = "mr+nobody"
  } else {
    for (var i=3; i<process.argv.length; i++){
      if(i == 3) movieName = movieName + process.argv[i];
      else movieName = movieName + "+" + process.argv[i];
    }
  }
 
  // run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";
  var request = require("request");

  // request using query url
  request(queryUrl, function(error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {
      // title of movie
      console.log("Title: " + JSON.parse(body).Title);
      // year it came out
      console.log("Released: " + JSON.parse(body).Released);
      // country produced
      console.log("Country: " + JSON.parse(body).Country);
      // language
      console.log("Language: " + JSON.parse(body).Language);
      // plot
      console.log("Plot: " + JSON.parse(body).Plot);
      // actors
      console.log("Actors: " + JSON.parse(body).Actors);
      // imdb tomatoes rating
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      // rotten tomatoes rating
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
      // rotten tomatoes URL
      console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
      } 
  });
}

function runCommand(){
  var fs = require('fs');
  // use random.txt to take in command
  fs.readFile('random.txt', 'utf8', function(err, data) {
     var textArr = data.split(',');
     console.log(textArr); 
     command = textArr[0];
     input = textArr[1];
     liri();
  });
}


function liri(){
  // if/else for commands
  if (command == "my-tweets"){
    getTweets();
  } else if (command == "spotify-this-song"){
    getSong();
  } else if (command == "movie-this"){
    getMovie(); 
  } else if (command == "do-what-it-says"){
    runCommand();
  } else {
    console.log("that is not a valid command");
  }
}

liri();