import React from "react";
import './App.css';

// const fetch = require('node-fetch');
// const fs = require('fs');
const names = require('./database/names.json');
const data = require('./database/data');
const lyrics = require('./database/lyrics');
const {getInfo, findArtist, grabLyrics} = require('./components/external');

// //Variable declaration
var token = 'Smt_torbfQuRV_7yc1ae-ASTB1D0o5QM83oI8ojk3TWhivAwVccK_Ge-XBgqYwnr';
var baseurl = 'https://api.genius.com';
var spath = '/search?q='+names.artist+'%20&access_token='+token;
var iter = 4;
const PORT = 8888;

// //Get request method
// getInfo(baseurl, spath); 
// grabLyrics(names, data, token, iter);

// //Grabs Artist name from website
// findArtist(req.body);

function App() {
  return (
    <div className="App">
      <h3>This is the </h3> <h1>Bar Exam</h1>
      <p>Type in an artist you want to search (search results are dependent on spelling)</p>
      <input type="text" value="Kendrick Lamar"></input>
      <button>Clicky here</button>
    </div>
  );
}

export default App;
