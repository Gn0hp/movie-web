const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const slug= require('mongoose-slug-generator');


const Movie = new Schema({
    title:{type: String, maxLength: 255, required: true},
    subtitle: {type: String, maxLength: 255, default: 'Unknown'},
    background: {type: String, default:'/images/background.jpg'},
})

module.exports = mongoose.model('Movie', Movie);