const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ptit = new Schema({
    title: {type: String, maxLength: 255, default: "No title for this"},
    img : {type: String, maxLength: 255, default: "Unknown"},
    des: {type: String, maxLength: 255, default: "No description for this"},
    link: {type: String, maxLength: 255, default: "Unknown"},
})

module.exports = mongoose.model('Ptit', Ptit);
