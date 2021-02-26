const fetch = require('node-fetch');
const fs = require('fs');
const {getLyrics} = require('genius-lyrics-api');

var songs = [];
var albumcovers = [];
var artData= {songs, albumcovers};

var keyword = ['Chorus', 'Verse', 'Intro', 'Outro', 'Chorus 2', 'Verse 2'];
var keysymbol = ']'
var starCount = 0

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
        }
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
    .then(lyrics => {
        var formatedLyrics = lyrics.replace(/(\r\n|\n|\r)/gm, "*");
        var findKeyword = formatedLyrics.search(keyword[0]);
        var twoBars = runthrough(findKeyword, formatedLyrics);
        twoBars = twoBars.join("");
        var objectLyrics = {lyrics:twoBars};
        var jsonLyrics = JSON.stringify(objectLyrics)
        fs.writeFile('./database/lyrics.json', jsonLyrics, (err) => {
            if(err) console.log(err);
            else console.log('Lyrics are recorded');
          });
    });
}

function runthrough(location, flyrics) {
    var bars = [];
    //Starts the loop at "C" in "Chorus"...
    for(var i = location; i < flyrics.length; i++) {
        //And tries to locate the ] symbol (for special conditions, eg: [Chorus: kendrick lamar])
        if(flyrics[i] == keysymbol) {
            location = i+1;
            //capCheck looks out for how many lines we want to grab from the lyrics being pulled
            while(starCount < 3) {
                //Find the \n marker
                if(flyrics[location] == "*") {
                    //Add to the marker counter
                    starCount++;
                    //push in a newline for formating
                    bars.push("\n");
                } else {
                    //Push in the words of the lyrics
                    bars.push(flyrics[location]);
                }
                //Move onto the nexxt character
                location++;
            }
            return bars;
        }
    }
}

module.exports = {
    getInfo,
    findArtist,
    grabLyrics
}