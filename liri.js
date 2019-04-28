require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios");

var command = process.argv[2];
var param = process.argv.slice(3).join(" ");
Liri(command, param);

function Liri(command, parameter) {
    switch (command) {
        case "concert-this":
            // Do the bandsintown thing with parameter (or Rick Astley)
            if (parameter.length === 0) {
                parameter = "rick astley";
            }
            var getURL = "https://rest.bandsintown.com/artists/" + parameter
                + "/events?app_id=" + keys.axios.bit;
            axios.get(getURL).then(function (ack) {
                // console.log(ack.data);
                var theConcerts = ack.data;
                // Filter for venue, location, date for *each* event
                if (theConcerts.length) {
                    console.log("I found these " + parameter + " concerts:")
                    for (var i = 0; i < theConcerts.length; i++) {
                        theRegion = "";
                        if (theConcerts[i].venue.region.length) {
                            theRegion = theConcerts[i].venue.region + ", ";
                        }
                        console.log("");
                        console.log(theConcerts[i].venue.name);
                        console.log(theConcerts[i].venue.city + ", "
                            + theRegion + theConcerts[i].venue.country);
                        console.log(theConcerts[i].datetime);
                    }
                }
                else {
                    console.log("I'm sorry, " + parameter + " is not touring.")
                }
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
                    // console.log(ack.tracks.items[0]);
                    var data = ack.tracks.items[0];
                    // Artist(s), name, preview link, album
                    console.log("The song " + data.name + " is performed by ");
                    data.artists.forEach(element => {
                        console.log(element.name);
                    });
                    console.log("Here's a preview:");
                    console.log(data.preview_url);
                    console.log("The song is on the album " + data.album.name + ".");
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
                // console.log(ack.data);
                var theMovie = ack.data;
                // Title, year, IMDB rating, RT rating, production country, language, plot, actors
                console.log("The movie " + theMovie.Title + " was released in " + theMovie.Year + ".");
                console.log("IMDB gives it " + theMovie.Ratings[0].Value+ ".");
                console.log("Rotten Tomatoes gives it " + theMovie.Ratings[1].Value+ ".");
                console.log("It was filmed in " + theMovie.Language + ", in " + theMovie.Country + ", with " + theMovie.Actors+ ".");
                console.log(theMovie.Plot);
            }).catch(OhCrap);
            break;
        case "do-what-it-says":
            // use fs to read random.txt and execute as if the contents were passed as argv
            fs.readFile("./random.txt", "utf8", DoWhatItSays);
            break;

        default:
            console.log("I'm afraid I can't do that, Dave.");
            break;
    }
}
function DoWhatItSays(err, data) {
    if (err) {
        OhCrap(err);
    }
    else {
        console.log(data);
        readArgs = data.split(",");
        console.log(readArgs);
        Liri(readArgs[0], readArgs[1]);
    }
}

function OhCrap(err) {
    console.log(err);
    console.log("Shit done broke.");
}