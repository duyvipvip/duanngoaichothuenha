var Router = require('express').Router();
var thanhtoancontroller = require('./../controllers/thanhtoan.controller');

Router.post('/create', taothanhtoan);
Router.get('/getallthanhtoan', getallthanhtoan);
Router.post('/editthanhtoan', editthanhtoan);
Router.get('/getallthanhtoanbyuser/:iduser', getallthanhtoanbyuser);

module.exports = Router;

function taothanhtoan(req, res, next){
    thanhtoancontroller.taothanhtoan(req.body)
    .then((res)=>{
        return res.send(res);
    })
    .catch((err)=>{
        return next(err);
    })
}

//
function getallthanhtoan(req, res, next){
    thanhtoancontroller.getallthanhtoan()
    .then((data) => {
        return res.send(data);
    })
    .catch((err) => {
        next(err);
    })
}

function getallthanhtoanbyuser(req, res, next){
    thanhtoancontroller.getallthanhtoanbyuser(req.params.iduser)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {

        })
}

function editthanhtoan(req, res, next){
    console.log(req.body);
    thanhtoancontroller.editthanhtoan(req.body)
        .then((data) => {
            return res.send(data);
        })
        .catch((err) => {
            next(err);
        })
}