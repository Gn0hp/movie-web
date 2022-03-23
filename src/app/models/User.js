const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, maxLength: 255, required: true},
    password: {type: String, maxLength: 255, required: true},
    avatar: {type:String ,default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.unipulse.tokyo%2Fen%2Fregister%2F&psig=AOvVaw0aQwXmBnNhwJsNO8nlJcHw&ust=1647340587328000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjduJG0xfYCFQAAAAAdAAAAABAD'}
})

module.exports = mongoose.model('User', User);
