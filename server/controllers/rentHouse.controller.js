var rentHouse = require('../models/rentHouse.model');
var Room = require('../models/room.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    createRentHouse: createRentHouse,
    getRentHouseById: getRentHouseById,
    getRentHouseByIdUser: getRentHouseByIdUser,
    deleteRentHouse: deleteRentHouse,
    quanlyhoahong: quanlyhoahong
}

//
function getRentHouseById(id) {
    return rentHouse.findById(id)
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

//
function getRentHouseByIdUser(id) {
    return rentHouse.findOne({id})
}

//
function createRentHouse(body) {
    var newObjectBody = {
        "iduser": body.iduserRented,
        "status": 0,
        "createdate": new Date()
    }
    return rentHouse.findOne({ iduserRented: body.iduserRented })
        .then(((renthouse) => {
            if (renthouse == null) {
                let newRentHouse = new rentHouse(body)
                return newRentHouse.save().then((res) => {
                        return Room.findOne({ _id: body.idhouse }).then((data) => {
                                if (data != null) {
                                    if (data.iduserRentHouse.length == 0) {
                                        data.iduserRentHouse.push(newObjectBody);
                                    } else {
                                        let index = data.iduserRentHouse.map(function (e) {
                                            return e.iduser;
                                        }).indexOf(newObjectBody.iduser)
                                        if (index == -1) {
                                            data.iduserRentHouse.push(newObjectBody);
                                        }
                                    }
                                    return data.save().then((dulieu) => {
                                        return Promise.resolve(res);
                                    })
                                }
                                return Promise.resolve(res);
                            })
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    })
            }
            return Promise.resolve(renthouse);
        }))

}

function deleteRentHouse(idhouse, iduser){
    return rentHouse.findOneAndDelete({idhouse: idhouse, iduserRented: iduser})
        .then(() => {
            return Room.update({ "_id": idhouse, "iduserRentHouse.iduser": iduser }, { $pull: { "iduserRentHouse": {"iduser": iduser}}})
                .then((data) => {
                    return Promise.resolve(data);
                })
        })
}

function quanlyhoahong(iduser){
    return Room.find({"id_user": iduser, "iduserRentHouse.status": 1})
    .then((data) => {
        return Promise.resolve(data);
    })
}