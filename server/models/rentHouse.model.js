var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var rentHouseSchema = new Schema({
    iduserRent:{
        type:String
    },
    iduserRented:{
        type:String
    },
    idhouse: {
        type: String
    },
    price:{
        type: String,
        default:'0'
    },
    checkHouse: {
        type: Number,
        default: 0
    },
    unit: {
        type: String
    }
})
var rentHouse = mongoose.model('renthouse',rentHouseSchema);
module.exports = rentHouse;