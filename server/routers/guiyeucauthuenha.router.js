var Router = require('express').Router();
var YeuCauThueNhaController = require('./../controllers/guiyeucauthuenha.controller');
var path = require('path');
var fs = require("fs");
const uuid = require('uuid');
var YeuCauThueNha = require('../models/guiyeucauthuenha.model');
Router.post('/taoyeucauthuenha', taoYeuCauThueNha);
Router.get('/checkngoinhadathue', CheckNgoiNhaDaThue);
Router.delete('/xoangoinhadathue', xoaYeuCauThueNha);
Router.get('/layCacYeuCauThueNhaCuaUser', layCacYeuCauThueNhaCuaUser);
Router.post('/thaydoitrangthai', Thaydoitrangthai);
module.exports = Router;

function layCacYeuCauThueNhaCuaUser(req,res, next){
    YeuCauThueNhaController.layCacYeuCauThueNhaCuaUser()
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}
function taoYeuCauThueNha(req,res, next){
    var dir = path.join(__dirname, '../public/image');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var data = new YeuCauThueNha(JSON.parse(req.body.data));
    let file = req.files.files;
    data.hinhchungminhnhandan.push('room_' + uuid.v4() + '.png');
    file.mv(path.join(__dirname, '../public/image/' + data.hinhchungminhnhandan[0]), (err) => {
        if (err) {
            return next(err);
        }
    })
    YeuCauThueNhaController.taoYeuCauThueNha(data)
        .then((data)=>{
            return res.send(data);
        })
        .catch((err)=>{
            return next(err);
        })
}
function CheckNgoiNhaDaThue(req, res, next){
    let model = {
        idngoinha: req.query["idngoinha"] || '',
        idnguoigui: req.query["idnguoigui"] || '',
    }
    YeuCauThueNhaController.CheckNgoiNhaDaThue(model)
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}

function xoaYeuCauThueNha(req, res, next){
    let model = {
        idngoinha: req.query["idngoinha"] || '',
        idnguoigui: req.query["idnguoigui"] || '',
    }
    YeuCauThueNhaController.xoaYeuCauThueNha(model)
    .then((data)=>{
        return res.send(data);
    })
    .catch((err)=>{
        return next(err);
    })
}

function Thaydoitrangthai(req, res, next){
    YeuCauThueNhaController.thaydoitrangthai(req.body.idyeucau, req.body.trangthai, req.body.idhouse)
    .then((data) => {
        return res.json({ message: 'success' });
    })
    .catch((err) => {
        return next(err);
    })
}