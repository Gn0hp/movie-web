const path= require('path');
const route=require('./routes/index')
//create express app
const express = require('express');
const app = express();
const port = 3000;
app.listen(port,() => {
    console.log('server started at port: '+port);
})

// config handlebars
const handlebars = require('express-handlebars');
const hdbs = handlebars.create({
    extname: '.hdbs',
    helpers: {}
})
app.engine('hdbs', hdbs.engine); //declare
app.set("view engine", "hdbs");

//parse+encoded req
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set view
app.set("views", path.join(__dirname, "resources", "views"));

//set static dir
app.use(express.static(path.join(__dirname, "public")));

const db =require('./app/config/db')
db.connect();


route(app)


//axios using similar to fetch except can use return immediately without parsing json