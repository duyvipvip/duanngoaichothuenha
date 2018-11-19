var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var thanhtoanSchema = new Schema({
    idhouse: {
        type:Schema.Types.ObjectId,
        ref:'room'
    },

    iduser: {
        type:Schema.Types.ObjectId,
        ref:'user'
    },
   
    status: { 
        type: Boolean,
        default: false
    }
})
var thanhtoan = mongoose.model('thanhtoan', thanhtoanSchema);
module.exports = thanhtoan;