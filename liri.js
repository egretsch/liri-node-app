require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const request = require('request');
const fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



function getUserComads(array) {
    let commad = array[2];
    let searchTerm = '';
    for (var i = 3; i < array.length; i++) {
        if (i > 3 && i < array.length) {
            searchTerm += "+" + array[i];
        } else {
            searchTerm += array[i];
        }
    }

    userComand(commad, searchTerm);
}

function userComand(commad, searchTerm) {
    switch (commad) {
        case "my-tweets": getTweets("edward_gretsch");
            break;
        case "spotify-this-song": 
            if (searchTerm) {
                getSpotify(searchTerm);
            } else {
                getSpotify("The Sign");
            }
            break;
        case "movie-this": 
            if (searchTerm) {
                movieOMDB(searchTerm);
            } else {
                movieOMDB("Mr. Nobody");
            };
            break;
        case "do-what-it-says": doWhat();
            break;
        default: console.log("!!!You Got Nothing!!!");
            break;
    }
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
                console.log("@edward_gretsch: " + tweet + "\n" + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
                //adds text to log.txt file
                fs.appendFileSync('log.txt', "@edward_gretsch: " + tweet + " Created At: " + date.substring(0, 19));
                fs.appendFileSync('log.txt', "-----------------------");
            }
        }
    });
}

function getSpotify(song, i) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songData = data.tracks.items[0];
            const artist = songData.artists[0].name;
            const song = songData.name;
            const songURL = songData.preview_url;
            const album = songData.album.name

            console.log("Artist: " + artist);
            console.log("Song Name: " + song);
            console.log("Spotify URL: " + songURL);
            console.log("Album: " + album);
            console.log("-----------------------");

            fs.appendFileSync('log.txt', "Artist: " + artist);
            fs.appendFileSync('log.txt', "Song Name: " + song);
            fs.appendFileSync('log.txt', "Spotify URL: " + songURL);
            fs.appendFileSync('log.txt', "Album: " + album);
            fs.appendFileSync('log.txt', "-----------------------");
        }
    });

}

function movieOMDB(movieName) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let body1 = JSON.parse(body);
            let mTitle = body1.Title;
            let mYear = body1.Year;
            let IMDBRating = body1.imdbRating;
            let rotTomRat = body1.Ratings[2].Value;
            let mCountry = body1.Country;
            let mLanguage = body1.Language;
            let mPlot = body1.Plot;
            let mActors = body1.Actors;
            
            console.log("Title: " + mTitle);
            console.log("Year: " + mYear);
            console.log("IMDB Rating: " + IMDBRating);
            console.log("Roten Tomato Rating: " + rotTomRat);
            console.log("Country: " + mCountry);
            console.log("Langeuage: " + mLanguage);
            console.log("Plot: " + mPlot);
            console.log("Actors: " + mActors);
            console.log("-----------------------");

            fs.appendFileSync('log.txt', "Title: " + mTitle);
            fs.appendFileSync('log.txt', "Year: " + mYear);
            fs.appendFileSync('log.txt', "IMDB Rating: " + IMDBRating);
            fs.appendFileSync('log.txt', "Roten Tomato Rating: " + rotTomRat);
            fs.appendFileSync('log.txt', "Country: " + mCountry);
            fs.appendFileSync('log.txt', "Langeuage: " + mLanguage);
            fs.appendFileSync('log.txt', "Plot: " + mPlot);
            fs.appendFileSync('log.txt', "Actors: " + mActors);
            fs.appendFileSync('log.txt', "-----------------------");
            
        }
    });
}

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            throw error;
        } 

        let commands = data.split(",");

        var commandArray = [];

        console.log(commands);
        for (let i = 0; i < array.length; i++) {
            if(i )
            
        }
        

            // userComand(commands[0], commands[1]);
    
});  

}

getUserComads(process.argv);