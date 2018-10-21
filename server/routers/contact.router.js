var Router = require('express').Router();
var Contact = require('./../models/contact.model');
var authadmin = require('../middle-ware/authadmin');
var Status = require('../constants/status');
var ContactController = require('./../controllers/contact.controller');

Router.post('/CreateContact',CreateContact);
Router.get('/GetContact',authadmin.authadmin(),GetContact)
module.exports = Router;
function CreateContact(req,res,next){
    let body =req.body;

    ContactController.CreateContact(body)
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}
function GetContact(req,res,next){
    ContactController.GetContact()
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}
