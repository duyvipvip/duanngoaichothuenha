var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var rentHouseSchema = new Schema({
    iduserRent:{
        type:String
    },
    iduserRented:{
        type:String
    },
    price:{
        type: String,
        default:'0'
     },
     checkHouse: {
         type: Number
     }
})
var rentHouse = mongoose.model('house',rentHouseSchema);
module.exports = rentHouse;