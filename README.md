# liri-node-app
Command line node thingy

## Node modules:
.env, node-spotify-api, fs, axios, moment

## What it does:
Takes one of several commands as command line arguments, with optional parameters.
all api keys are stored in .env.

## The commands:
### concert-this:
node liri concert-this (band)
This command uses axios to query the bandsintown api for concerts by the specified band.
If no band is passed, LIRI will rickroll the user by returing concerts featuring Rick Astley.
### spotify-this-song
node liri spotify-this-song (song)
This command uses the node-spotify-api to query the spotify api for the specified song.  The search term is mapped in a very fuzzy way, so the user may need to include the band in order to get the song they're looking for.
If no song is specified, LIRI wil search for "The Sign" by Ace of Base.
### movie-this
node liri movie-this (movie)
This command uses axios to query the OMDB api for the specified movie.
If no movie is specified, the command queries for "Mr. Nobody".
### do-what-it-says
node liri do-what-it-says
This command uses fs to parse random.txt and execute the command within.
currently the command queries spotify for "I Want it That Way".