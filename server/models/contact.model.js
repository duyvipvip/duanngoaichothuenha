var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paramater = require('../constants/paramater');
var conractSchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    email:{
        type: String,
        default:""
    },
    message :{
        type: String,
        default:""
     },
    dateCreat:{
        type:Date,
        default:Date.now()
    }
    
})
var contact = mongoose.model('contact',conractSchema);
module.exports = contact;