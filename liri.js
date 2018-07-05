require("dotenv").config();
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js');
const request = require('request');
const fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function getTweets(userName) {

    console.log("function called")
    

var params = { screen_name: userName };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
        console.log(error);
    }
    else{
        for (let i = 0; i < tweets.length; i++) {
            let tweet = tweets[i].text;
            let timeStamp = tweets[i].created_at;

            console.log(tweet, timeStamp);
            
        }
    }
});
}


getTweets("edward_gretsch");