const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelSchema = Schema({
 title:{type:String},
 place:{type:String},
 about:{type:String},
 image:{type:String, default:'http://placehold.it/350x150'},
 created: { type:Date,default:Date.now }
});

module.exports = mongoose.model('Travel', TravelSchema);