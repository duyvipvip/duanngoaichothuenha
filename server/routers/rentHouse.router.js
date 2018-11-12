var Router = require('express').Router();
var RentHouse = require('./../models/rentHouse.model');
var auth = require('../middle-ware/auth');
var authadmin = require('../middle-ware/authadmin');
var path = require('path');
var fs = require('fs');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
var rentHouseController = require('./../controllers/rentHouse.controller');

Router.post('/create', createRentHouse);
Router.get('/GetHouseById/:id',GetHouseById);

module.exports = Router;
function GetHouseById(){
    let id = req.params.id;
    rentHouseController.getRentHouseById(id)
    .then((res)=>{
        return res.send(res);
    })
    .catch((err)=>{
        return next(err);
    })
}

//
function createRentHouse(req,res, next){
    rentHouseController.createRentHouse(req.body)
        .then((data)=>{
            return res.send(data);
        })
        .catch((err)=>{
            return next(err);
        })
}