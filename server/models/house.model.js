var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paramater = require('../constants/paramater');
var houseSchema = new Schema({
    name:{
        index: true,
        type:String
    },
    description:{
        type: String,
        default:'unknown'
     },
     phone:{
        type:String
     },
    rooms:[{
        type:Schema.Types.ObjectId,
        ref:'room'
    }]
    
})
var house = mongoose.model('house',houseSchema);
module.exports = house;