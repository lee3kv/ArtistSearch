//const fetch = require('node-fetch');

var firstname = document.getElementById('firstname');
firstname.value = 'First name';
var lastname = document.getElementById('lastname');
lastname.value = 'Last name';

var data;

var submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    //Make sure the text bar isnt empty
    if (firstname.value === '' || lastname.value === '') {
        alert("Write something");
        return;
    }
    fname = firstname.value;
    lname = lastname.value;
    data = {fname, lname};
    //This is the text from the text bar
    fetch('/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    firstname.value = '';
    lastname.value = '';
})