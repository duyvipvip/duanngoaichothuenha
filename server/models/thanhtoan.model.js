var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var thanhtoanSchema = new Schema({
    idhouse: {
        type:Schema.Types.ObjectId,
        ref:'room'
    },

    idyeucau: {
        type:Schema.Types.ObjectId,
        ref:'guiyeucauthuenha'
    },
   
    status: { 
        type: Boolean,
        default: false
    }
})
var thanhtoan = mongoose.model('thanhtoan', thanhtoanSchema);
module.exports = thanhtoan;