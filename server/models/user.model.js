var mongoose = require('mongoose');
var Schema     =mongoose.Schema;
var userSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String
    },
    sex :{
        type: Boolean
    },
    address:{
        type: String,
        default:'unknown'
    },
    role:{
        type: String,
        default:'user'
    },
    avatar:{
        type:String,
        default:"unknow"
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number
        }
    }
    
})
var user = mongoose.model('user',userSchema);
module.exports = user;
