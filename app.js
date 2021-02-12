const express = require('express');
const app = express();

const fs = require('fs');
const names = require('./names.json');
const data = require('./data.json');
const {getInfo, findArtist} = require('./external');

//Variable declaration
var token = 'Smt_torbfQuRV_7yc1ae-ASTB1D0o5QM83oI8ojk3TWhivAwVccK_Ge-XBgqYwnr';
var baseurl = 'https://api.genius.com';
var spath = '/search?q='+names.fname+'%20'+names.lname+'&access_token='+token;
const PORT = 8888;

//Grabbing files in public
app.use(express.static('public'));

//Converts incoming data as json
app.use(express.json());

//Gathers wanted items from Genius api
app.get('/result', (req, res) => {
  getInfo(baseurl, spath); 
  res.send(data);
});

//Send back the songs and album covers
app.post('/', (req, res) => {
  if(!req.body) return res.status(400).send('wrong');
  res.status(200).send('good');
  findArtist(req.body);
});

//Loading the page
app.listen(PORT, ()=>console.log('listening to port ' + PORT));