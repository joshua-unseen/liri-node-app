require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var parameter = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        // Do the bandsintown thing with parameter (or Rick Astley)
        break;
    case "spotify-this-song":
        // do the spotify thing with parameter (or "The Sign")
        break;
    case "movie-this":
        // do the OMDB thing with parameter (or "Mr Nobody")
        break;
    case "do-what-it-says":
        // use fs to read random.txt and execute as if the contents were passed as argv
        break;

    default:
        break;
}