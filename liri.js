require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios");

var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        // Do the bandsintown thing with parameter (or Rick Astley)
        if (parameter.length === 0) {
            parameter = "rick astley";
        }
        var getURL = "https://rest.bandsintown.com/artists/" + parameter
            + "/events?app_id=" + keys.axios.bit;
        axios.get(getURL).then(function (ack) {
            console.log(JSON.stringify(ack));
            // Filter for venue, location, date for *each* event.
        }).catch(OhCrap);
        break;
    case "spotify-this-song":
        // do the spotify thing with parameter (or "The Sign")
        var spotify = new Spotify(keys.spotify);
        if (parameter.length === 0) {
            parameter = "ace of base the sign";
        }
        spotify.search({ type: "track", query: parameter, limit: 1 })
            .then(function (ack) {
                console.log(ack.tracks.items[0]);
                // Artist(s), name, preview link, album
            }).catch(OhCrap);
        break;
    case "movie-this":
        // do the OMDB thing with parameter (or "Mr Nobody")
        if (parameter.length === 0) {
            parameter = "mr nobody";
        }
        var getURL = "https://www.omdbapi.com/?t=" + parameter
            + "&y=&plot=short&apikey=" + keys.axios.omdb;
        axios.get(getURL).then(function (ack) {
            console.log(ack);
            // Title, year, IMDB rating, RT rating, production country, language, plot, actors
        }).catch(OhCrap);
        break;
    case "do-what-it-says":
        // use fs to read random.txt and execute as if the contents were passed as argv
        break;

    default:
        console.log("I can't do that, Dave.");
        break;
}

function OhCrap(err) {
    console.log(err);
    console.log("Shit done fucked up.");
}