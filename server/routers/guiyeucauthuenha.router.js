var Router = require('express').Router();
var YeuCauThueNhaController = require('./../controllers/guiyeucauthuenha.controller');

Router.post('/taoyeucauthuenha', taoYeuCauThueNha);
Router.get('/checkngoinhadathue', CheckNgoiNhaDaThue);
Router.delete('/xoangoinhadathue', xoaYeuCauThueNha);
module.exports = Router;
function taoYeuCauThueNha(req,res, next){
    YeuCauThueNhaController.taoYeuCauThueNha(req.body)
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