const fetch = require('node-fetch');
const fs = require('fs');

//Gathers wanted items from Genius api using fetch...
function getInfo (baseurl, spath) {
    fetch(baseurl+spath, {
        method:"GET",
        mode: 'no-cors',
        header: {
            'Content-Type': 'application/json',
        },
    })
    .then(res=>res.json())
    .then(json=>{
        //and properly stores wanted data (song titles and album cover urls) in the data.json file
        var data = {};
        for (var i = 0; i < 10; i ++) {
            data["song"+i] = json.response.hits[i].result.title;
        }
        for (var j = 0; j < 10; j ++) {
            data["albumcover"+j] = json.response.hits[j].result.header_image_thumbnail_url;
        }
        var jsonData = JSON.stringify(data);
        fs.writeFile('./database/data.json', jsonData, (err) => {
          if(err) console.log(err);
          else console.log('Data is recorded');
        });
    })
    .catch(err=>console.log(err));
}

//Takes the request.body (which contains the artist's first and last name) object from the post request...
function findArtist (body) {
    //and places them both in the names.json file
    var jsonNames = JSON.stringify(body);
    fs.writeFile('./database/names.json', jsonNames, (err) => {
      if(err) console.log(err);
      else console.log('Names are recorded');
    });
}

module.exports = {
    getInfo,
    findArtist
}