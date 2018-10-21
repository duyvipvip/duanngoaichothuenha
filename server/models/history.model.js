var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paramater = require('../constants/paramater');
var historySchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    dateTransaction :{
        type: Date,
        default:Date.now()
     },
    room:{
        type:Schema.Types.ObjectId,
        ref:'room'
    }
    
})
var history = mongoose.model('history',historySchema);
module.exports = history;