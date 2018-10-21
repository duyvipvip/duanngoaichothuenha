var House = require('../models/house.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    createHouse:createHouse,
    GetHouseById:GetHouseById
}
function GetHouseById(id){
    return House.findById(id)
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function createHouse(body){
    console.log(body);
    let newHouse = new House(body)
    return newHouse.save()
    .then((res)=>{
        return Promise.resolve(res);
    })
    .catch((err)=>{
        return Promise.reject(err);
    })
}