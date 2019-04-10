var Router = require('express').Router();
var HouseController = require('./../controllers/ho.controller');

Router.post('/CreateHouse', CreateHouse);
Router.get('/GetHouseById/:id',GetHouseById);

module.exports = Router;
function GetHouseById(){
    let id = req.params.id;
    HouseController.GetHouseById(id)
    .then((res)=>{
        return res.send(res);
    })
    .catch((err)=>{
        return next(err);
    })
}
function CreateHouse(){
    var body = req.body;
    HouseController.CreateHouse(body)
        .then((res)=>{
            return res.send(res);
        })
        .catch((err)=>{
            return next(err);
        })
}