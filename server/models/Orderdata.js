const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewOrderSchema = new Schema({
    userId:String,
    name : String,
    age : Number,
    place : String,
    phoneNumber: Number,
    medicineName : String,
    doctorsName : String,
    prescription : String
});

var Orderdata = mongoose.model('order', NewOrderSchema, 'orders');

module.exports = Orderdata;

