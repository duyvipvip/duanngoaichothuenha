var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paramater = require('../constants/paramater');
var roomSchema = new Schema({
    title: {
        index: true,
        type: String,
        required: true
    },
    Type: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    acreage: { //diện tích
        index: true,
        type: String,
        default: 0
    },
    price: {
        index: true,
        type: Number,
        required: true
    },
    unit: { //don vi 
        type: String
    },
    image: [{
        type: String,
        default: 'unknow'
    }],
    hinhanhgiayto: [{
        type: String,
    }],
    trangthai: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
    },
    description: {
        type: String,
        default: 'unknown'
    },
    phone: {
        type: String
    },
    status_room: {
        // 0 la cho thue 1 da day 
        type: Number,
        default: paramater.ROOM_USE
    },
    sex: {
        type: String,
        default: "Tất Cả"
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'house'
    },
    iduserRentHouse: [
        {
            iduser: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            status: {
                type: Number
            },
            createdate: {
                type: Date
            }
        }
    ],
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    rate: [
        {
            idUser:{
                type: String
            },
            star:{
                type: Number
            }
        }
    ],
    category: {
        type: String,
    },
    trangthaidathue: {
        type: Boolean,
        default: false
    },

})
var room = mongoose.model('room', roomSchema);
module.exports = room;
