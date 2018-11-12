var rentHouse = require('../models/rentHouse.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    createRentHouse:createRentHouse,
    getRentHouseById:getRentHouseById
}

//
function getRentHouseById(id){
    return rentHouse.findById(id)
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}

//
function createRentHouse(body){
    let newRentHouse = new rentHouse(body)
    return newRentHouse.save()
    .then((res)=>{
        return Promise.resolve(res);
    })
    .catch((err)=>{
        return Promise.reject(err);
    })
}