require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var fs = require('fs');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

moment().format("MM/DD/YYYY");
 



//////////   Switch Statement  /////////////////////
var pick = function(action, value){
switch (action) {
case "concert-this":
    concertSearch(value);
    break;

case "spotify-this-song":
    spotifySearch(value);
    break;

case "movie-this":
    movieSearch(value);
    break;

case "do-what-it-says":
    textSearch();
    break;
}}


////////// Identify process.argv variables ////////////////////

var action = process.argv[2];
var value = process.argv[3];


//////// SPOTIFY SHIT BELOW  ////////////////////////////////////
////// To Do / Having Trouble
// 
// 
// log default for empty input
///////////////////////////////////////////
var showArtist = function (artist) {
    return artist.name;
};

var spotifySearch  = function(songName) {
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else if (process.argv[3] === null){
        songName === 'the sign'
    }

    var songs = data.tracks.items;

    for (var i=0; i < songs.length; i++){
        console.log('-----------------------------------------------');
        // console.log(i);
        // console.log(data.tracks.items[0].artists);
        console.log('artist(s): ' + songs[i].artists.map(showArtist));
        console.log('song name: ' + songs[i].name);
        console.log('preview song: ' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('-----------------------------------------------');

        }
  });
}

//////////////////////////////////////////////
//////// BANDSINTOWN BELOW //////////////////////////////////
///// To Do / Having Trouble
//
// use moment to format date   ?????
//
//
///////////////////////////////////////////
function concertSearch(){
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response){
        console.log("-------------------------------");

        // console.log(response.data);

        console.log("Band: " + value)

        console.log("Venue: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);

        console.log("Venue Location: " + response.data[0].venue.name);
        
        console.log("Date: " + (response.data[0].datetime));

        console.log("-------------------------------");
    })
}

///////////////////////////////////////////////
//////// OMDB BELOW  ///////////////////////////////////////
////// To Do / Having Trouble    
//-- log default for empty input  ????
//--
//-- 
//
///////////////////////////////////////////

function movieSearch(){
    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        console.log("-------------------------------");
        // console.log(response.data);
        console.log("Movie Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year)
        console.log("The movie's rating is: " + response.data.imdbRating);
        console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("-------------------------------");
    })
}

///////////////////////////////////////////////
//////// .TXT BELOW  ///////////////////////////////////////
////// To Do / Having Trouble
//-- text can be read, 
//--
//--
///////////////////////////////////////////

 function textSearch(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err) throw err;
        dataArr = data.split(',')
        pick(dataArr[0], dataArr[1])
    })
  }



///////////////////////////////////////////////


////// identify userinputs to run ///////////////
var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
