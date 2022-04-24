const axios = require("axios");
const fs = require("fs");
var options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',
    params: {id: '40008598', locale: 'en-US'},
    headers: {
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
      'x-rapidapi-key': 'bbdc16465emshd20fc0aad10fe92p1d2fb2jsn0eb3f6545b15'
    }
  };
axios.request(options).then(data=>{
  console.log(data)
    fs.writeFileSync("./Example.json", JSON.stringify(data.data.tracks));
})
.catch(err=>{
    console.log(err)
})

