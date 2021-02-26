const express = require('express');
const app = express();
const fs = require('fs');
const names = require('./database/names.json');
const data = require('./database/data.json');
const {getInfo, findArtist, grabLyrics} = require('./library/external');

//Variable declaration
var token = 'Smt_torbfQuRV_7yc1ae-ASTB1D0o5QM83oI8ojk3TWhivAwVccK_Ge-XBgqYwnr';
var baseurl = 'https://api.genius.com';
var spath = '/search?q='+names.named+'%20&access_token='+token;
var iter = 4;
const PORT = 8889;

//Grabbing files in 'public' folder
app.use(express.static('public'));

//Converts incoming data as json
app.use(express.json());

//Get request method
app.get('/result', (req, res) => {
  getInfo(baseurl, spath); 
  grabLyrics(names, data, token, iter);
  res.send(data);
});

//Grabs Artist name from website
app.post('/', (req, res) => {
  if(!req.body) return res.status(400).send('wrong');
  res.status(200).send('good');
  findArtist(req.body);
});

//Loading the page
app.listen(PORT, ()=>console.log('listening to port ' + PORT));