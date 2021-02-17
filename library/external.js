const fetch = require('node-fetch');
const fs = require('fs');
const {getLyrics, getSong} = require('genius-lyrics-api');

var songs = [];
var albumcovers = [];
var artData= {songs, albumcovers};
var options = {
    apiKey:'',
    title:'',
    artist:'',
    optimizeQuery: true
}

//Gathers wanted items from Genius api using fetch...
function getInfo(baseurl, spath) {
    fetch(baseurl+spath, {
        method:"GET",
        mode:'no-cors',
        header: {
            'Content-Type': 'application/json',
        },
    })
    .then(res=>res.json())
    .then(json=>{
        //create a json object with just the songs and album cover urls
        for(var i = 0;i < 10;i++) {
            artData.songs[i] = json.response.hits[i].result.title;
        }
        for(var j = 0;j < 10;j++) {
            artData.albumcovers[j] = json.response.hits[j].result.header_image_thumbnail_url;
        }
        //and finally store that json object on an external .json file (data.json)
        var jsonData = JSON.stringify(artData);
        fs.writeFile('./database/data.json', jsonData, (err) => {
            if(err) console.log(err);
            else console.log('Data is recorded');
        });
    })
    .catch(err=>console.log(err));
}

//Takes the request.body (which contains the artist's first and last name) object from the post request...
function findArtist(body) {
    //and places them both in the names.json file
    var jsonNames = JSON.stringify(body);
    fs.writeFile('./database/names.json', jsonNames, (err) => {
      if(err) console.log(err);
      else console.log('Names are recorded');
    });
}

//
function grabLyrics(names, data, token, iter) {
    //
    options.apiKey = token;
    options.artist = names.named;
    options.title = data.songs[iter];
    getLyrics(options)
    .then(lyrics=> {
        fs.writeFile('./database/lyrics.json', lyrics, (err) => {
            if(err) console.log(err);
            else console.log('Lyrics are recorded')
        });
    });
}

module.exports = {
    getInfo,
    findArtist,
    grabLyrics
}