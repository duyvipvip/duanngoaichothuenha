var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GuiYeuCauThueNhaSchema = new Schema({
    idnguoigui: {
        type: String
    },
    idngoinha:{
        type:Schema.Types.ObjectId,
        ref:'room'
    },
    chungminhthu: {
        type: String
    },
    sodienthoai: {
        type: String
    },
    tennguoigui: {
        type: String
    },
    note: {
        type: String
    },
    diachi: {
        type: String
    },
    hinhchungminhnhandan: [{
        type: String
    }],
    trangthai: {
        type: Number,
        default: 0
    }
})
var guiyeucauthuenha = mongoose.model('guiyeucauthuenha',GuiYeuCauThueNhaSchema);
module.exports = guiyeucauthuenha;