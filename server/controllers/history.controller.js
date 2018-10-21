var History = require('../models/history.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    GetHistoryById: GetHistoryById,
    GetHistoryAdmin: GetHistoryAdmin
}
function GetHistoryAdmin() {
    return History.find()
        .populate('idUser', { username: 1, phone: 1, _id: 0 })
        .populate('room', { title:1,address: 1, price: 1, unit: 1, _id: 0 })
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function GetHistoryById(id) {
    return History.find({ idUser: id })
        .populate('idUser', { username: 1, phone: 1, _id: 0 })
        .populate('room', {title:1, address: 1, price: 1, unit: 1, _id: 0 })
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
