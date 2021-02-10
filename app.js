const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 8888;

//Variable declaration
var fname = 'Kendrick';
var lname = 'Lamar';
var json;
var token = 'Smt_torbfQuRV_7yc1ae-ASTB1D0o5QM83oI8ojk3TWhivAwVccK_Ge-XBgqYwnr';
var baseurl = 'https://api.genius.com';
var spath = '/search?q='+fname+'%20'+lname+'&access_token='+token;

//API Fetch command
app.get('/result', (req, res) => {
  fetch(baseurl + spath, {
    method:"GET",
    mode: 'no-cors',
    header: {
      'Content-Type': 'application/json',
      //Recommended by API, doesnt work
      'Authorization': 'Bearer '+token
    },
  })
    .then(res=>res.json())
    .then(data=>{
      json = data;
    })
    .catch(err=>console.log(err));
  res.send(json);
})

//Loading the page
app.listen(PORT, ()=>console.log('listening to port ' + PORT));
