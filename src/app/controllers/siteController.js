//var axios = require("axios").default;
const fs = require("fs");
const converter = require("../../utils/convertObject");
const Movies = require("../models/Movies");

const cheerio = require("cheerio");   //~jquery
const req_promise= require("request-promise");
class SiteController {
  home(req, res) {
    // var options = {
    //     method: 'GET',
    //     url: 'https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',
    //     params: {id: '40008598', locale: 'en-US'},
    //     headers: {
    //       'x-rapidapi-host': 'shazam.p.rapidapi.com',
    //       'x-rapidapi-key': 'bbdc16465emshd20fc0aad10fe92p1d2fb2jsn0eb3f6545b15'
    //     }
    //   };
    //axios.request(options)
    //const data = await JSON.parse(fs.readFileSync("./Example.json", "utf-8"));
    
    Movies.find({}).limit(6)
      .then((data)=>converter.multipleToObject(data))     //convert to Object
    .then((data) => {
      
      res.render("home", {
        arr: data,
        coverImg: data[0].images.background,
        titleImg: data[0].images.coverarthq,
      });
    });
  }
}
module.exports = new SiteController();
