require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const request = require('request');
const fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


const commad = process.argv[2];
const movOrSon = process.argv;

//movie or song
var x = "";
//attaches multiple word arguments
for (var i = 3; i < movOrSon.length; i++) {
    if (i > 3 && i < movOrSon.length) {
        x = x + "+" + movOrSon[i];
    } else {
        x = x + movOrSon[i];
    }
}


switch (commad) {
    case "my-tweets": getTweets("edward_gretsch");
        break;
    case "spotify-this-song": 
        if (x) {
            getSpotify(x);
        } else {
            getSpotify("The Sign");
        }
        break;
    case "movie-this": console.log(num1 * num2);
        break;
    case "do-what-it-says": console.log(num1 / num2);
        break;
    default: console.log("!!!You Got Nothing!!!");
        break;
}

function getTweets(userName) {
    var params = { screen_name: userName };
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (error) {
            console.log(error);
        }
        else {
            for (let i = 0; i < tweets.length; i++) {
                let tweet = tweets[i].text;
                var date = tweets[i].created_at;
                console.log("@edward_gretsch: " + tweet + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
                //adds text to log.txt file
                fs.appendFile('log.txt', "@edward_gretsch: " + tweet + " Created At: " + date.substring(0, 19));
                fs.appendFile('log.txt', "-----------------------");
            }
        }
    });
}

function getSpotify(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songData = data.tracks.items[i];
            const artist = songData.artists[0].name;
            const song = songData.name;
            const songURL = songData.preview_url;
            const album = songData.album.name
            console.log(album);
            console.log("Artist: " + artist);
            console.log("Song Name: " + song);
            console.log("-----------------------");

            fs.appendFile('log.txt', "@edward_gretsch: " + tweet + " Created At: " + date.substring(0, 19));
            fs.appendFile('log.txt', "-----------------------");
        }
    });

}



