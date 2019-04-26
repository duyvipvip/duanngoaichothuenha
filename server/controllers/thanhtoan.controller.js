var thanhtoan = require('../models/thanhtoan.model');
var Room = require('../models/room.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    taothanhtoan: taothanhtoan,
    getallthanhtoan: getallthanhtoan,
    editthanhtoan: editthanhtoan,
    getallthanhtoanbyuser: getallthanhtoanbyuser
}

//
function taothanhtoan(body) {
    return thanhtoan.create(body)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

//
function getallthanhtoan(){
    return thanhtoan.find()
        .populate('idhouse')
        .populate('idyeucau')
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function getallthanhtoanbyuser(iduser){
    return thanhtoan.find({iduser: iduser})
        .populate('idhouse')
        .then((res) => {
            console.log(res);
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// 
function editthanhtoan(body){
    return thanhtoan.update({idhouse: body.idhouse, iduser: body.iduser}, {status: body.status})
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
