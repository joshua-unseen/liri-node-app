console.log("keys.js is loaded.\n");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
}

exports.axios = {
    bit: process.env.BIT_ID,
    omdb: process.env.OMDB_ID
}