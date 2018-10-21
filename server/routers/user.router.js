var Router = require('express').Router();
var User = require('./../models/user.model');
var auth = require('../middle-ware/auth');
var authadmin = require('../middle-ware/authadmin');
var path = require('path');
var fs = require('fs');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
var UserController = require('./../controllers/user.controller');

Router.post('/CreateUser', creatUser);
Router.get('/GetUser',authadmin.authadmin(),getAllUser);
Router.post('/UploadAvatar',auth.auth(),uploadAvatar);
Router.get('/GetInforUser',auth.auth(),getInforUser);
Router.put('/ChangePassword',auth.auth(),changPassword);
Router.post('/FogetPassword',FogetPassword);
Router.put('/UpdateUser',auth.auth(),UpdateUser);
Router.put('/UpdateUserByAdmin',UpdateUserByAdmin);
Router.delete('/DeleteUser/:id',authadmin.authadmin(),deleteUser);
module.exports = Router;
function deleteUser(req,res,next){
   let id = req.params.id;
   console.log(id,"sas");
   
    UserController.deleteUser(id)
    .then((data)=>{
        return res.send("success");
    })
    .catch((err)=>{
        next((err))
    })
}
function UpdateUserByAdmin(req,res,next){
    let body = req.body;
    UserController.UpdateUserByAdmin(body)
        .then((data)=>{
            return res.send("success");
        })
        .catch((err)=>{
            next((err))
        })
}
function UpdateUser(req,res,next){
    let id = req.user._id;
    let body = req.body;
    UserController.updateUser(id,body)
        .then((data)=>{
            return res.send(data);
        })
        .catch((err)=>{
            next((err))
        })
}
function FogetPassword(req,res,next){
    let email = req.body.email;
    if(!email){
        return next({message:ErrorUser.ERROR_MAIL_EMPTY,statusCode:Status.BAD_REQUEST});
    }
    UserController.forgetPassword(email)
        .then(()=>{
            return res.send({message:ErrorUser.SUCCESS,statusCode:Status.SUCCESS});
        })
        .catch((err)=>{
            next(err)
        })

}
function changPassword(req,res,next){
    let id = req.user._id;
    let body = req.body;
    
    if(!req.body.password_old||!req.body.new_password||!req.body.retype_new_password){
        return next({message:ErrorUser.PASSWORD_EMPTY,statusCode:Status.BAD_REQUEST});
    }
    if(req.body.new_password != req.body.retype_new_password){
        return next({message:ErrorUser.PASSWORD_REPEAT,statusCode:Status.BAD_REQUEST});
    }
    UserController.changePassword(id,body)
        .then((data)=>{
            return res.send({message:ErrorUser.SUCCESS,statusCode:Status.SUCCESS});
        })
        .catch((err)=>{
            return next(err);
        })
}
function getInforUser (req,res,next){
    let id = req.user._id;
    UserController.getInforUser(id)
        .then((user)=>{
            return res.send(user);
        })
        .catch((err)=>{
            return next(err);
        })
}
function uploadAvatar (req,res,next){
    var dir = path.join(__dirname, '../public/avatar');
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let id = req.user._id;
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }
    let file = req.files.files;
    UserController.uploadAvatar(id,file)
        .then((user)=>{
            return res.send(user);
        })
        .catch((err)=>{
            return next(err);
        })
}
function getAllUser(req, res, next){
    UserController.getUsers()
        .then((user)=>{
            return res.send(user);
        })
        .catch((err)=>{
            return next(err);
        })
}
function creatUser(req, res, next) {
    var data = req.body;
    UserController.createUser(data)
        .then(() => {
            res.json({
                message: ErrorUser.SUCCESS,
                statusCode:Status.SUCCESS
            });
        })
        .catch((err) => {
            next(err)
        })
}

