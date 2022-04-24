const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SKU = new Schema({
    quantity: {type: Number, default: 0},
    img : {type: String, maxLength: 255, default: "Unknown"},
    des: {type: String, maxLength: 255, default: "No description for this"},
    carted: {type: Array, default:[]}
})

module.exports = mongoose.model('SKU', SKU);
