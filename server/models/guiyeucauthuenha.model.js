var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GuiYeuCauThueNhaSchema = new Schema({
    idnguoigui: {
        type: String
    },
    idngoinha:{
        type: String
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
})
var guiyeucauthuenha = mongoose.model('guiyeucauthuenha',GuiYeuCauThueNhaSchema);
module.exports = guiyeucauthuenha;