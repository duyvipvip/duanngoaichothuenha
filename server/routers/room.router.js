var Router = require('express').Router();
var Room = require('../models/room.model');
var RoomController = require('../controllers/room.controller');
var path = require('path');
const uuid = require('uuid');
var fs = require("fs");
var auth = require('../middle-ware/auth');
var authadmin = require('../middle-ware/authadmin');
var path = require('path');
var fs = require('fs');
var Status = require('../constants/status');
var RoomError = require('../Error/errorRoom');
var paramater = require('../constants/paramater');

Router.put('/deleteImage/:id', deleteImage);
Router.post('/CreateRoom',auth.auth(), creatRoom);
Router.delete('/DeleteRoom/:id', deleteRoom);
Router.post('/UpLoadImageRoom/:id', updateImageRoom);
Router.put('/UpdateRoom/:id', updateRoom);
Router.get('/GetRoom', getsRoom);
Router.get('/getRoomById/:id',getRoomById);
Router.get('/GetRoomByUser',auth.auth(),getRoomByUser);
Router.put('/Transaction/:id',Transaction);

module.exports = Router;
function Transaction(req,res,next){
    var id = req.params.id;
    RoomController.Transaction(id)
        .then((data)=>{
            return res.send({message:"success"});
        })
        .catch((err)=>{
            return next(err);
        })

}
function getRoomById(req,res,next){
    var id = req.params.id;
    RoomController.getRoomById(id)
    .then((data)=>{
        return res.send(data)
    })
    .catch((err)=>{
        return next((err))
    })
}
function getRoomByUser(req,res,next){ 
    var id = req.user._id;

    
    RoomController.getRoomByUser(id)
        .then((data)=>{
            return res.send(data)
        })
        .catch((err)=>{
            return next((err))
        })
}
function deleteImage(req, res, next) {
    var id = req.params.id;
    var img = req.body.image;

    RoomController.deleteImageRoom(id, img)
        .then((resulf) => {
            return res.send({ message: 'success' });
        })
        .catch((err) => {
            return res.send({ message: 'fail' });
        })
}
function deleteRoom(req, res, next) {
    var id = req.params.id;

    RoomController.deleteRoom(id)
        .then(() => {
            return res.send({ message: "success" });
        })
        .catch((err) => {
            return res.send({ message: "fail" });
        })
}
function updateImageRoom(req, res, next) {
    var id = req.params.id;
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }
    let file = req.files.file;
    RoomController.updateImageRoom(id, file)
        .then((image) => {
            return res.send({
                image: image
            })
        })
        .catch((err) => {
            return res.send('fail!')
        })
}
function updateRoom(req, res, next) {
    var id = req.params.id;
    var update = req.body;
    RoomController.updateRoom(id, update)
        .then((Room) => {
            return res.send({ message: "success" });
        })
        .catch((err) => {
            return res.send({ message: "fail" });
        })



}
function getsRoom(req, res, next) {
    let page={
        search:req.query["search"]||'',
        amount:req.query["amount"]||30,
        page:req.query["page"]||1,
        sort:req.query["sort"]||'name',
        type:req.query["type"]||1
    }
    
    RoomController.getsRoom(page)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            return res.send(err);
        })
}
function creatRoom(req, res, next) {
    let id_user = req.user._id;
    var dir = path.join(__dirname, '../public/image');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var data = new Room(JSON.parse(req.body.data));
    data.id_user = id_user;
    if (!data.title) {
        next({
            message: RoomError.ERROR_TITLE
        })
    } 
    else if (!data.address) {
        next({
            message: RoomError.ERROR_ADDREST
    
     })
    } 
    else if (!data.price) {
        next({
            message: RoomError.ERROR_PRICE
        })
    } else if (!data.description) {
        message: RoomError.ERROR_DESCRIPTION
    }

    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }
    let file = req.files.files;
    data.image.push('room_' + uuid.v4() + '.png');
        file.mv(path.join(__dirname, '../public/image/' + data.image[0]), (err) => {
            if (err) {
                return next(err);
            }
        })
    RoomController.createRoom(data)
        .then((data) => {

            return res.json({ message: 'success' });
        })
        .catch((err) => {
            return next(err);
        })
}


