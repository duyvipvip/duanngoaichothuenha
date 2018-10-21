var Router = require('express').Router();
var History = require('./../models/history.model');
var auth = require('../middle-ware/auth');
var authadmin = require('../middle-ware/authadmin');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
var HistoryController = require('../controllers/history.controller');

Router.get('/GetHistory',auth.auth(),GetHistory);
Router.get('/GetHistoryAdmin',authadmin.authadmin(),GetHistoryAdmin)
module.exports = Router;
function GetHistory(req,res,next){
    let id  = req.user._id;
    HistoryController.GetHistoryById(id)
    .then((data)=>{
        return res.send({data});
    })
    .catch((err)=>{
        return next(err);
    })
}
function GetHistoryAdmin(req,res,next){
    HistoryController.GetHistoryAdmin()
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}
