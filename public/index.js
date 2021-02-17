//const fetch = require('node-fetch');

var names = document.getElementById('name');
names.value = "kendrick lamar"

var data;

var submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    var named = names.value
    //Make sure the text bar isnt empty
    if (names.value === '') {
        alert("Write something");
        return;
    }
    data = {named};
    //This is the text from the text bar
    fetch('/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
})